import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'; 
import MintModal from '../tokenmint/MintModal';
import { sendToken } from '../transaction/sendToken';
import { PublicKey } from '@solana/web3.js';
import { useAnchorWallet } from '@solana/wallet-adapter-react';



interface CaseCardProps {
    caseItem: {
        caseId: number;
        title: string;
        category: string;
        description: string;
        imageUrl: string;
    };
    onUpdate: (caseItem: any) => void;
    onDelete: (caseId: number) => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseItem}) => {
    
    const [isModalOpen, setModalOpen] = useState(false);
    const [tokenData, setTokenData] = useState(null);
    const [isMinted, setIsMinted] = useState(false); // New state for mint status
    const [ticker, setTicker] = useState(''); // New ss
    const [versions, setVersions] = useState([]); // Start with an empty array
    const [isBuying, setIsBuying] = useState(false); 

    const wallet = useAnchorWallet();

    const handleAddVersion = () => {
        const newVersion = `Version ${versions.length + 2}.0.0`; // Start from 2.0
        setVersions([...versions, { version: newVersion }]);
    };

    const handleBuyToken = async () => {

        try {
            setIsBuying(true);  // Set loading state

            // Call sendToken method with mint address and amount (assuming 1 for this example)
            const mintAddress = tokenData?.mintPublicKey; // Get mint address from token data
            const amount = 100; // Define the amount you want to send

            const signature = await sendToken(new PublicKey(mintAddress), amount, wallet?.publicKey); // Call sendToken
            alert(`Transaction successful! Tx: ${signature}`);
        } catch (error) {
            console.error('Error buying token:', error);
            alert('Transaction failed!');
        } finally {
            setIsBuying(false);  // Reset loading state
        }
    };

    const handleMintToken = (tokenInfo: any) => {
        setTokenData(tokenInfo); // Save the token data in state
        setIsMinted(true); // Set minted status to true
        setTicker(ticker); 
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 h-x flex flex-col">
            <div className='p-6'>
                <img
                    src={caseItem.imageUrl}
                    alt={caseItem.title}
                    className="w-full object-cover rounded-md mb-4 "
                />
                <h2 className="text-2xl font-semibold mb-2">{caseItem.title}</h2>
                <p className="text-sm text-gray-500 mb-4">{caseItem.category}</p>
                <p className="text-gray-700 flex-grow">{caseItem.description}</p>
                
       
            </div>
            
            <div className='bg-gray-100 p-4 flex justify-between items-center'>
                <span className="text-sm">Version 1.0.0</span>
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faPlus} className="mr-2 cursor-pointer text-gray-500" onClick={handleAddVersion} />
                    {isMinted ? (
                        <button 
                            className="bg-green-600 text-white text-sm px-3 py-1 rounded-full hover:bg-green-700"
                            onClick={handleBuyToken} // Call handleBuyToken when buying
                            disabled={isBuying} // Disable while processing
                        >
                            {isBuying ? 'Processing...' : `Buy ${tokenData?.metadata.symbol}`}
                        </button>
                    ) : (
                        <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full hover:bg-blue-700" onClick={() => setModalOpen(true)}>
                            Mint Token
                        </button>
                    )}
                </div>
            </div>

            {versions.length > 0 && versions.map((v, index) => (
                <div key={index} className="bg-gray-100 p-4 flex justify-between items-center">
                    <span className="text-sm">{v.version}</span>
                    <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-full hover:bg-blue-700 focus:outline-none"
                        onClick={() => setModalOpen(true)}>
                        Mint Token
                    </button>
                </div>
            ))}

        <MintModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onMintToken={handleMintToken} />

        {tokenData && (         
            <div className="token-info">
                <p>Token Name: {tokenData.metadata.name}</p>
                <p>Token Symbol: {tokenData.metadata.symbol}</p>
                <p>Token Address: {tokenData.mintPublicKey.toString()}</p>
            </div>
        )}
        </div>
    );
};

export default CaseCard;
