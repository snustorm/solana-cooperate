import { percentAmount, signerIdentity, generateSigner } from '@metaplex-foundation/umi';
import { TokenStandard, createAndMint, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Connection, clusterApiUrl, Keypair } from '@solana/web3.js';

export async function mintTokenWithWallet(wallet) {
  const connection = new Connection(clusterApiUrl('devnet')); // Replace with the correct cluster
  const umi = createUmi(connection);

  // Ensure the wallet is connected
  if (!wallet || !wallet.publicKey) {
    throw new Error('Wallet not connected');
  }

  // Use the wallet adapter's public key as the user's wallet signer
  const userWalletSigner = {
    publicKey: wallet.publicKey,
    signTransaction: wallet.signTransaction,
  };

  // Set the user's wallet as the identity
  umi.use(signerIdentity(userWalletSigner));
  umi.use(mplTokenMetadata());

  // Metadata for the token
  const metadata = {
    name: "Best Token Ever",
    symbol: "BTE",
    uri: "IPFS_URL_OF_METADATA",
  };

  // Create the mint account (without generating a new keypair)
  //const mint = Keypair.generate(); // Generate a new token mint
  const mint = generateSigner(umi);

  // Mint and create the token using the wallet's public key
  try {
    await createAndMint(umi, {
      mint, // Mint PublicKey
      authority: umi.identity, // User's wallet as mint authority
      name: metadata.name,
      symbol: metadata.symbol,
      uri: metadata.uri,
      sellerFeeBasisPoints: percentAmount(0),
      decimals: 8, // Number of decimals
      amount: 1000000_00000000, // Amount to mint
      tokenOwner: wallet.publicKey, // User's wallet owns the minted tokens
      tokenStandard: TokenStandard.Fungible,
    }).sendAndConfirm(umi);

    console.log("Successfully minted 1 million tokens (", mint.publicKey, ")");
    return mint.publicKey; // Return the mint address
  } catch (err) {
    console.error("Error minting tokens:", err);
    throw err;
  }
}
