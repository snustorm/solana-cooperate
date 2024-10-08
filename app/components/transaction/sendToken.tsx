import { 
    Connection, 
    PublicKey, 
    Keypair, 
    Transaction, 
    sendAndConfirmTransaction,
    ParsedAccountData
  } from '@solana/web3.js';
  import { 
    createTransferInstruction, 
    getOrCreateAssociatedTokenAccount, 
    TOKEN_PROGRAM_ID, 
  } from '@solana/spl-token';
  import secret from '../tokenmint/guideSecret.json'; // Ensure correct path to secret
  
  // Create connection outside the function to reuse
  const SOLANA_CONNECTION = new Connection('https://api.devnet.solana.com');
  
  // Function to get the number of decimals for the mint
  async function getNumberDecimals(mintAddress: PublicKey): Promise<number> {
      const mintInfo = await SOLANA_CONNECTION.getParsedAccountInfo(mintAddress);
      const parsedInfo = (mintInfo.value?.data as ParsedAccountData).parsed.info;
      return parsedInfo.decimals as number;
  }
  
  // Function to transfer tokens
  export const sendToken = async (
    mintAddress: PublicKey,  // Should be PublicKey type
    transferAmount: number,   // Token amount to transfer
    destinationWalletPubKey: PublicKey  // Pass destination wallet's PublicKey as argument
  ) => {
      // Use the sender's keypair (loaded from secret for demonstration purposes)
      const FROM_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(secret));
      
      try {
          // Fetch or create associated token accounts for both buyer and seller
          console.log(`Sending ${transferAmount} tokens from ${FROM_KEYPAIR.publicKey.toString()} to ${destinationWalletPubKey.toString()}`);
          console.log("mint address: ", mintAddress.toBase58());
  
          // Step 1: Get Source Token Account
          console.log('1 - Getting Source Token Account');
          const sourceAccount = await getOrCreateAssociatedTokenAccount(
              SOLANA_CONNECTION,
              FROM_KEYPAIR,
              mintAddress,  
              FROM_KEYPAIR.publicKey
          );
          console.log(`   Source Account: ${sourceAccount.address.toString()}`);
  
          // Step 2: Get Destination Token Account
          console.log('2 - Getting Destination Token Account');
          const destinationAccount = await getOrCreateAssociatedTokenAccount(
              SOLANA_CONNECTION,
              FROM_KEYPAIR,
              mintAddress,  // Mint address for the token
              destinationWalletPubKey  // PublicKey of the recipient
          );
          console.log(`   Destination Account: ${destinationAccount.address.toString()}`);
  
          // Step 3: Fetch Number of Decimals for the Mint
          console.log('3 - Fetching Number of Decimals');
          const numberDecimals = await getNumberDecimals(mintAddress);
          console.log(`   Number of Decimals: ${numberDecimals}`);
  
          // Step 4: Create and Send the Transfer Transaction
          console.log('4 - Creating and Sending Transaction');
          const tx = new Transaction().add(
              createTransferInstruction(
                  sourceAccount.address, 
                  destinationAccount.address, 
                  FROM_KEYPAIR.publicKey, 
                  transferAmount * Math.pow(10, numberDecimals),  // Adjust transfer amount for decimals
                  [],  // Optional signers
                  TOKEN_PROGRAM_ID
              )
          );
  
          // Get the latest blockhash for the transaction
          const { blockhash } = await SOLANA_CONNECTION.getLatestBlockhash();
          tx.recentBlockhash = blockhash;
          tx.feePayer = FROM_KEYPAIR.publicKey;
  
          // Sign and send the transaction
          const signature = await sendAndConfirmTransaction(SOLANA_CONNECTION, tx, [FROM_KEYPAIR]);
  
          console.log(
              '\x1b[32m', // Green text
              `   Transaction Success! 🎉`,
              `\n    https://explorer.solana.com/tx/${signature}?cluster=devnet`
          );
          return signature;  // Return the transaction signature for reference
  
      } catch (error) {
          console.error('Failed to send token:', error);
          throw error;
      }
  };
  