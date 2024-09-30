// mint.tsx
import { percentAmount, generateSigner, signerIdentity, createSignerFromKeypair } from '@metaplex-foundation/umi';
import { TokenStandard, createAndMint, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import secret from './guideSecret.json';
import { pinFileToIPFS, pinJSONToIPFS } from '../utils/UploadImageToIPFS';

// Function to mint the token
export const mintToken = async (name: string, symbol: string, totalSupply: number) => {
    try {
        const umi = createUmi('https://api.devnet.solana.com');
        const userWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret));
        const userWalletSigner = createSignerFromKeypair(umi, userWallet);

        const metadata = {
            name,
            symbol,
            description: `This is the ${name} token!`,
            image: "https://blue-legal-cicada-830.mypinata.cloud/ipfs/QmX893XSvqMgqsbyjGT2kY3vHpUxRg3T5D1sPCAeGyKJL1" // Placeholder, will be updated later
        };

        const mint = generateSigner(umi);
        umi.use(signerIdentity(userWalletSigner));
        umi.use(mplTokenMetadata());

        //write a all the meta data to a json file here 
     
        console.log("Uploading metadata to IPFS...");
        const metadataResponse = await pinJSONToIPFS(metadata);
        if (!metadataResponse?.IpfsHash) {
            console.error("Failed to upload metadata to IPFS");
            return null;
        }

        const metadataUri = `https://gateway.pinata.cloud/ipfs/${metadataResponse.IpfsHash}`;
        console.log("Metadata uploaded to IPFS: ", metadataUri);

        // Mint the token
        const mintTransaction = await createAndMint(umi, {
            mint,
            authority: umi.identity,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadataUri,
            sellerFeeBasisPoints: percentAmount(0),
            decimals: 8,
            amount: totalSupply,
            tokenOwner: userWallet.publicKey,
            tokenStandard: TokenStandard.Fungible,
        }).sendAndConfirm(umi);

        console.log("Token minted successfully:", mintTransaction);
        return { mintPublicKey: mint.publicKey, metadata };
    } catch (err) {
        console.error("Error minting token:", err);
        throw err;
    }
};
