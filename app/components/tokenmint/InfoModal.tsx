import React from 'react';
import Image from 'next/image';

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUnderstand: () => void; // This will trigger the MintModal opening
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, onUnderstand }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center text-gray-700">
            <div className="bg-white p-6 rounded-md w-96">
                <h2 className="text-2xl font-semibold mb-4">How Token Minting Works</h2>
                
                {/* Image section */}
                <Image 
                    src={'/fig/mint-pic.png'} 
                    alt="Solana Token Flying" 
                    layout="responsive" 
                    width={400} 
                    height={300} 
                    className="w-full mb-4 rounded-md" 
                />
                
                {/* Paragraph content */}
                <p className="text-gray-600 mb-4">
                    Minting a token creates a new SPL token on the Solana blockchain. This token can represent ownership, access, or be used for any custom purpose you define. Make sure you understand the process before proceeding.
                </p>

                {/* New content */}
                <h3 className="text-lg font-bold mb-2 mt-8">What to do next?</h3>
                <ul className="list-disc list-inside mb-10">
                    <li>Mint your SPL token</li>
                    <li>Fundraising by selling tokens</li>
                    <li>Keep building to go public</li>
                </ul>

                {/* Understand button */}
                <button
                    className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 w-full"
                    onClick={onUnderstand} // This will open the mint modal
                >
                    Understand
                </button>
            </div>
        </div>
    );
};

export default InfoModal;