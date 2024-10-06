'use client';

import { useMemo, useState, useEffect} from 'react';
import { AnchorProvider, Program } from '@project-serum/anchor';
import { Connection, PublicKey, clusterApiUrl, SystemProgram } from '@solana/web3.js';
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from '../components/wallet/AppWalletProvider';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { pinFileToIPFS } from '../components/utils/UploadImageToIPFS';


import {
    getMasterAddress,
    getCaseAddress,
    getProgram,
} from "../components/utils/program";

import { confirmTx, mockWallet } from "../components/utils/helper";

const network = clusterApiUrl('devnet'); // or your specific network
const connection = new Connection(network, 'confirmed');
const provider = new AnchorProvider(connection, window.solana, { commitment: 'confirmed' });



export default function CreateCase() {
    
    const { connected, publicKey } = useWallet();
    const { connection } = useConnection();
    const wallet = useAnchorWallet();
    const router = useRouter();

    const [masterAddress, setMasterAddress] = useState<PublicKey | null>(null);
    const [initialized, setIsInitialized] = useState(false);
    const [caseId, setCaseId] = useState(0);

    // Use useMemo to get the program if connected
    const program = useMemo(() => {
        if (connected && wallet) {
            return getProgram(connection, wallet);
        }
        return null; // Ensure null is returned when wallet or connection is unavailable
    }, [connection, wallet, connected]);

    useEffect(() => {
        updateState()
    }, [program])

    const updateState = async () => {
        if(!program) return;

        try {
            if(!masterAddress){
                //get master address
                //how to we save the master address
                const masterAddress = await getMasterAddress();

                setMasterAddress(masterAddress);
            }
            const master = await program.account.master.fetch(masterAddress
                ?? getMasterAddress()
            );
            setIsInitialized(true);
            setCaseId(master.lastCaseId);
        } catch(err) {
            console.error("Error: ", err)
        }
    }
        

    const initMaster = async() => {
        try {
            const tx = await program?.methods.initialize()
                .accounts({
                    master: getMasterAddress(),
                    payer: wallet?.publicKey,
                    systemProgram: SystemProgram.programId,
                })
                .rpc()

                await confirmTx(tx, connection);

        } catch (err) {
            console.error("Error:", err);
        }
    }
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        //获取数据
        const formData = new FormData(event.target as HTMLFormElement);
        const title = formData.get('caseTitle') as string;
        const description = formData.get('caseDescription') as string;
        const category = formData.get('category') as string;

        // Image file and case file from the form
        const imageFile = formData.get('imageFile') as File;
        const caseFile = formData.get('caseFile') as File;

        // const imageFile = "http://localhost:3000/create-case";
        // const caseFile = "http://localhost:3000/create-case";

        let finalImageUrl;
        let finalCaseFile;

        if (imageFile) {
            console.log("Image detected");
            const response = await pinFileToIPFS(imageFile);
            if(response?.IpfsHash) {
                finalImageUrl = `https://gateway.pinata.cloud/ipfs/${response.IpfsHash}`;
                console.log("New Image URL from IPFS: ", finalImageUrl);
            } else {
                return null;
            }  
        } 

        if (caseFile) {
            console.log("Image detected");
            const response = await pinFileToIPFS(caseFile);
            if(response?.IpfsHash) {
                finalCaseFile = `https://gateway.pinata.cloud/ipfs/${response.IpfsHash}`;
                console.log("New Case File URL from IPFS: ", finalCaseFile);
            } else {
                return null;
            } 
        } 

        try{
            const tx = await program?.methods.createCase(title, description, category, finalImageUrl, finalCaseFile)
                .accounts({
                    case: getCaseAddress(caseId + 1), // Public key of the case account
                    master: getMasterAddress(), // Public key of the master account
                    authority: provider.wallet.publicKey,
                    systemProgram: SystemProgram.programId,
                })
            .rpc();
        
            await confirmTx(tx, connection);
            updateState();

            toast.success("Lottery Created!");
        
            // Handle form data including file upload
            console.log('Case created!', formData.get('caseFile'));
            console.log('Selected Category:', formData.get('category'));
            
            router.push('/');  
        } catch (err) 
        {
            console.error("Error: ", err);
        }
    };

    return (
            <div className="flex justify-center items-center min-h-screen bg-gray-100 p-8">
            {!initialized ? (
                <div className="flex flex-col items-center space-y-4 bg-gray-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 text-center">Please Initialize the Master before you Start</h3>
                    { connected ? (
                        <button
                            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50 transition duration-200"
                            onClick={initMaster}
                        >
                            Initialize Master
                        </button> 
                    ) : (
                        <WalletButton />
                    )}
                </div>
                ) : (
                <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold text-gray-800 mb-6">Create a New Case</h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Case Title */}
                        <div>
                            <label htmlFor="caseTitle" className="block text-sm font-medium text-gray-700 mb-1">Case Title</label>
                            <input
                                type="text"
                                name="caseTitle"
                                id="caseTitle"
                                placeholder="Enter case title"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        {/* Case Description */}
                        <div>
                            <label htmlFor="caseDescription" className="block text-sm font-medium text-gray-700 mb-1">Case Description</label>
                            <textarea
                                name="caseDescription"
                                id="caseDescription"
                                placeholder="Enter case description"
                                required
                                rows={4}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                name="category"
                                id="category"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            >
                                <option value="" disabled>Select a category</option>
                                <option value="Game">Game</option>
                                <option value="Metaverse">NFT</option>
                                <option value="Digital Art">Photo</option>
                            </select>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-1">Upload an Image</label>
                            <input
                                type="file"
                                name="imageFile"
                                id="imageFile"
                                accept="image/*"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        {/* File Upload */}
                        <div>
                            <label htmlFor="caseFile" className="block text-sm font-medium text-gray-700 mb-1">Upload a File (Game file, Photo image..) </label>
                            <input
                                type="file"
                                name="caseFile"
                                id="caseFile"
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition duration-300"
                            >
                                Create Case
                            </button>
                        </div>
                    </form>
                </div>
                 )}
            </div>

    );
}
