import React, { useState } from 'react';
import { mintToken } from './mint';
import { pinFileToIPFS } from '../utils/UploadImageToIPFS';

interface MintModalProps {
    isOpen: boolean;
    onClose: () => void;
    onMintToken: (tokenInfo: any) => void;
}

const MintModal: React.FC<MintModalProps> = ({ isOpen, onClose, onMintToken }) => {
    
    const [tokenName, setTokenName] = useState('');
    const [tokenTicker, setTokenTicker] = useState('');
    const [totalSupply, setTotalSupply] = useState<number>(0);
    const [description, setDescription] = useState(''); // New state for description
    const [imageFile, setImageFile] = useState<File | null>(null); // New state for image file
    const [isMinting, setIsMinting] = useState(false); // New state to track minting status

    const handleMint = async () => {
        if (!tokenName || !tokenTicker || totalSupply <= 0 || !description || !imageFile) {
            alert("Please fill in all the required fields."); // Alert if any field is missing
            return;
        }

        setIsMinting(true); // Set minting to true when the minting starts

        try {
            const imageUrl = await pinFileToIPFS(imageFile);
            if (!imageUrl) {
                alert("Image upload failed.");
                setIsMinting(false); // Reset minting status if upload fails
                return;
            }

            // Minting process starts
            const tokenInfo = await mintToken(tokenName, tokenTicker, description, imageUrl, totalSupply);
            onMintToken({
                ...tokenInfo,
                description,
                imageFile,
            });
            onClose(); // Close the modal after successful minting
        } catch (err) {
            console.error("Minting failed:", err);
        } finally {
            setIsMinting(false); // Reset minting status after process is done
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file); // Store the uploaded image file
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center text-gray-700">
            <div className="bg-white p-6 rounded-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Mint New SPL-Token</h2>
                
                {/* Token Name */}
                <label className="block mb-2">Token Name</label>
                <input 
                    type="text" 
                    value={tokenName} 
                    onChange={(e) => setTokenName(e.target.value)} 
                    className="border p-2 w-full mb-4 rounded-lg" // Rounded input
                    required
                    disabled={isMinting} // Disable input during minting
                />

                {/* Token Ticker */}
                <label className="block mb-2">Ticker</label>
                <input 
                    type="text" 
                    value={tokenTicker} 
                    onChange={(e) => setTokenTicker(e.target.value)} 
                    className="border p-2 w-full mb-4 rounded-lg" // Rounded input
                    required
                    disabled={isMinting} // Disable input during minting
                />

                {/* Total Supply */}
                <label className="block mb-2">Total Supply</label>
                <input 
                    type="number" 
                    value={totalSupply} 
                    onChange={(e) => setTotalSupply(parseInt(e.target.value))} 
                    className="border p-2 w-full mb-4 rounded-lg" // Rounded input
                    required
                    disabled={isMinting} // Disable input during minting
                />

                {/* Description */}
                <label className="block mb-2">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 w-full mb-4 rounded-lg" // Rounded textarea
                    rows={4} // Adjust the number of rows to fit more content
                    required
                    disabled={isMinting} // Disable input during minting
                ></textarea>

                {/* Image Upload */}
                <label className="block mb-2">Upload Image</label>
                <input 
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border p-2 w-full mb-4 rounded-lg" 
                    required
                    disabled={isMinting} // Disable input during minting
                />

                {/* Action Buttons */}
                <div className="flex justify-end">
                    <button 
                        className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${isMinting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`} 
                        onClick={handleMint} 
                        disabled={isMinting} // Disable button during minting
                    >
                        {isMinting ? 'Minting...' : 'Mint Now'}
                    </button>
                    <button 
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2" 
                        onClick={onClose}
                        disabled={isMinting} // Disable the cancel button during minting
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MintModal;