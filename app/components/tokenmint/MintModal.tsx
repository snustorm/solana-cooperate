import React, { useState } from 'react';
import { mintToken } from './mint';

interface MintModalProps {
    isOpen: boolean;
    onClose: () => void;
    onMintToken: (tokenInfo: any) => void;
}

const MintModal: React.FC<MintModalProps> = ({ isOpen, onClose, onMintToken }) => {
    const [tokenName, setTokenName] = useState('');
    const [tokenTicker, setTokenTicker] = useState('');
    const [totalSupply, setTotalSupply] = useState<number>(0);

    const handleMint = async () => {
        try {

            console.log("name: ", tokenName);
            console.log("ticker: ", tokenTicker);
            console.log("supply: ", totalSupply);

            const tokenInfo = await mintToken(tokenName, tokenTicker, totalSupply);
            onMintToken(tokenInfo); // Pass the token info back to the parent component
            onClose(); // Close the modal after successful minting
        } catch (err) {
            console.error("Minting failed:", err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Mint New SPL-Token</h2>
                
                <label className="block mb-2">Token Name</label>
                <input 
                    type="text" 
                    value={tokenName} 
                    onChange={(e) => setTokenName(e.target.value)} 
                    className="border p-2 w-full mb-4" 
                />

                <label className="block mb-2">Ticker</label>
                <input 
                    type="text" 
                    value={tokenTicker} 
                    onChange={(e) => setTokenTicker(e.target.value)} 
                    className="border p-2 w-full mb-4" 
                />

                <label className="block mb-2">Total Supply</label>
                <input 
                    type="number" 
                    value={totalSupply} 
                    onChange={(e) => setTotalSupply(parseInt(e.target.value))} 
                    className="border p-2 w-full mb-4" 
                />

                <div className="flex justify-end">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleMint}>Mint Now</button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded ml-2" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default MintModal;
