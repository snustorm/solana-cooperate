import { useState } from "react";
import MintModal from '../tokenmint/MintModal'; 
import InfoModal from '../tokenmint/InfoModal'; 
import { PublicKey } from '@solana/web3.js'; // Ensure to import this
import { sendToken } from '../transaction/sendToken'; // Update the path
import { useAnchorWallet } from "@solana/wallet-adapter-react";


export default function CaseCard({ caseItem }) {
    const [isInfoModalOpen, setInfoModalOpen] = useState(false); 
    const [isMintModalOpen, setMintModalOpen] = useState(false); 
    const [isBuying, setIsBuying] = useState(false);
    const [tokenInfo, setTokenInfo] = useState(null); 
    const [isMinted, setIsMinted] = useState(false);
    const [showSuccessNotice, setShowSuccessNotice] = useState(false);

    const wallet = useAnchorWallet();

    const handleOpenInfoModal = () => {
        setInfoModalOpen(true); 
    };

    const handleOpenMintModal = () => {
        setInfoModalOpen(false); 
        setMintModalOpen(true);  
    };

    const handleMintToken = (tokenInfo) => {
        console.log("Token minted successfully:", tokenInfo);
        setTokenInfo(tokenInfo); 
        setIsMinted(true); 
        setMintModalOpen(false); 
    };

    const handleBuyToken = async () => {
        if (!tokenInfo) return;

        setIsBuying(true);

        try {
            const mintAddress = new PublicKey(tokenInfo.mintPublicKey);
            const destinationWalletPubKey = wallet?.publicKey; // Buyer's wallet address
            const transferAmount = 1; // Specify the amount to transfer (adjust as needed)

            const tx = await sendToken(mintAddress, transferAmount, destinationWalletPubKey);
            console.log('Token purchased successfully');

            // Show success notice
            setShowSuccessNotice(true);

            // Hide notice after 3 seconds
            setTimeout(() => setShowSuccessNotice(false), 8000);
        } catch (error) {
            console.error('Error buying token:', error);
        } finally {
            setIsBuying(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 h-x flex flex-col">
            <div className='p-6'>
                <img
                    src={caseItem.imageUrl}
                    alt={caseItem.title}
                    className="w-full object-cover rounded-md mb-4"
                />
                <h2 className="text-2xl font-semibold mb-2">{caseItem.title}</h2>
                <p className="text-sm text-gray-500 mb-4">{caseItem.category}</p>
                <p className="text-gray-700 flex-grow">{caseItem.description}</p>
            </div>
            
            <div className='bg-gray-100 p-4 flex justify-between items-center'>
                <span className="text-sm">Version 1.0.0</span>
                <div className="flex items-center">
                    {isMinted ? (
                        <button 
                            className="bg-green-600 text-white text-sm px-3 py-1 rounded-full hover:bg-green-700"
                            onClick={handleBuyToken} 
                            disabled={isBuying}
                        >
                            {isBuying ? 'Processing...' : `Buy $${tokenInfo?.metadata.symbol}`}
                        </button>
                    ) : (
                        <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full hover:bg-blue-700" onClick={handleOpenInfoModal}>
                            Mint Token
                        </button>
                    )}
                </div>
            </div>

            {/* Info Modal */}
            <InfoModal
                isOpen={isInfoModalOpen}
                onClose={() => setInfoModalOpen(false)}
                onUnderstand={handleOpenMintModal}
            />

            {/* Mint Token Modal */}
            <MintModal
                isOpen={isMintModalOpen}
                onClose={() => setMintModalOpen(false)}
                onMintToken={handleMintToken}
            />

            {tokenInfo && (         
                <div className="token-info p-4 break-words text-xs bg-gray-100">
                    <div className="flex items-center space-x-2">
                        <img 
                            src={tokenInfo.metadata.imageUrl} 
                            alt={tokenInfo.metadata.name} 
                            className="w-6 h-6 object-cover rounded-full"
                        />
                        <span className="font-semibold">
                            {tokenInfo.metadata.name} ({tokenInfo.metadata.symbol})
                        </span>
                    </div>
                    
                    <div className="mt-2">
                        <a 
                            href={`https://explorer.solana.com/address/${tokenInfo.mintPublicKey}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-500 hover:underline"
                        >
                            {tokenInfo.mintPublicKey}
                        </a>
                    </div>
                </div>
            )}
            {showSuccessNotice && (
                <div className="fixed top-6 right-6 bg-white p-6 rounded-lg shadow-lg">
                    <p className="text-gray-700">🎉 Token purchased successfully!</p>
                    <p className="text-gray-400">Please check your wallet </p>
                </div>
            )}
        </div>
    );
}