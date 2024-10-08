'use client'

import { useEffect, useState } from "react";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { getProgram, getMasterAddress, getCaseAddress} from "../components/utils/program";
import { confirmTx } from '../components/utils/helper';
import { useRouter } from "next/navigation"; // Use this to redirect to another page
import UpdateCaseModal from "../components/card/UpdateCaseModal";


export default function CoCreator() {
    const [cases, setCases] = useState([]);
    const [selectedCase, setSelectedCase] = useState(null); // Track selected case for updates
    const wallet = useAnchorWallet();
    const { connection } = useConnection();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter(); 

    // Fetch cases from the Solana program
    const fetchCases = async () => {
        if (!wallet) return;

        const cachedCases = localStorage.getItem("cachedCases");
        const lastFetched = localStorage.getItem("lastFetched");

        const cacheExpiry = 5 * 60 * 1000; // 5 minutes cache expiry
        if (cachedCases && lastFetched && Date.now() - parseInt(lastFetched) < cacheExpiry) {
            setCases(JSON.parse(cachedCases));
            return;
        }

        const program = getProgram(connection, wallet);

        try {
            console.log("Fetching from the blockchain...");
            const master = await program.account.master.fetch(await getMasterAddress());
            const caseCount = master.lastCaseId;

            const caseData = [];
            for (let caseId = 1; caseId <= caseCount; caseId++) {
                const caseAccount = await program.account.case.fetch(await getCaseAddress(caseId));

                if (caseAccount.title !== "") {
                    caseData.push({
                        caseId, // Pass caseId to easily identify which case to update
                        title: caseAccount.title,
                        owner: caseAccount.authority.toString(), // Get the owner's public key
                        description: caseAccount.description,
                        imageUrl: caseAccount.imageUrl,
                    });
                }
            }

            // Cache fetched cases
            localStorage.setItem("cachedCases", JSON.stringify(caseData));
            localStorage.setItem("lastFetched", Date.now().toString());
            setCases(caseData);
        } catch (error) {
            console.error("Error fetching cases:", error);
        }
    };

    // Handle redirection to create case
    const handleAddNewCase = () => {
        router.push("/create-case"); // Redirect to create case page
    };


    const handleModalSubmit = async (updatedCase: { title: string; description: string; category: string }) => {
        
        if (!selectedCase || !wallet) return;

        const program = getProgram(connection, wallet);

        try {
            console.log("Old imageUrl: ", selectedCase);
            // Call the Solana program's update_case method
            const tx = await program.methods
                .updateCase(
                    selectedCase.caseId, // Pass the case ID
                    updatedCase.title,
                    updatedCase.description,
                    updatedCase.category,
                    selectedCase.imageUrl,
                    "http://localhost:3000/",
                )
                .accounts({
                    case: getCaseAddress(selectedCase.caseId),
                    master: getMasterAddress(), // Pass the case ID
                    authority: wallet.publicKey, // Ensure the user has authority to update
                })
                .rpc();
    
            // Confirm the transaction
            await confirmTx(tx, connection);
    
            localStorage.removeItem("cachedCases");
            localStorage.removeItem("lastFetched");

            fetchCases();
    
            console.log("Case updated successfully on-chain");
    
        } catch (error) {
            console.error("Error updating case:", error);
        }

    };


    // Handle case update
    const handleUpdate = (caseItem) => {
        setSelectedCase(caseItem); 
        setIsModalOpen(true);
    };

    // Handle case deletion
    const handleDelete = async (caseId: number) => {
        if (!wallet) return;

        const program = getProgram(connection, wallet);

        try {
            const tx = await program.methods
                .deleteCase(caseId)
                .accounts({
                    case: getCaseAddress(caseId),
                    master: getMasterAddress(),
                    authority: wallet.publicKey, // Ensure the user has authority to delete
                })
                .rpc();

            await confirmTx(tx, connection);
            localStorage.removeItem("cachedCases");
            localStorage.removeItem("lastFetched");
            fetchCases(); // Re-fetch after delete
            console.log("Case deleted successfully on-chain");

        } catch (error) {
            console.error("Error deleting case:", error);
        }
    };

    useEffect(() => {
        fetchCases(); // Fetch cases on mount
    }, [wallet, connection]);

    const truncatePublicKey = (key: string | undefined) => {
        if (!key || key.length < 6) return "N/A"; // Handle undefined or invalid keys
        return key.slice(0, 3) + '...' + key.slice(-3);
    };

    return (
        <div className="flex h-screen mx-20 text-gray-700">
            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Top Bar */}
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">Manage Cases</h1>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Search cases..." className="border rounded p-2" />
                        <button onClick={handleAddNewCase} className="bg-blue-500 text-white px-4 py-2">Add New Case</button>
                    </div>
                </div>

                {/* Case Management Table */}
                <table className="w-full text-left border-collapse ">
                    <thead className="">
                        <tr>
                            <th className="p-2">Select</th>
                            <th className="p-2">Title</th>
                            <th className="p-2">Description</th>
                            <th className="p-2">Owner</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {cases.length > 0 ? (
                            cases.map((caseItem) => (
                                <tr key={caseItem.caseId} className="border-t">
                                    <td className="p-2">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="p-2">{caseItem.title}</td>
                                    <td className="p-2 truncate">{caseItem.description}</td>
                                    <td className="p-2 relative group">
                                        <div className="truncate max-w-xs" title={caseItem.owner}>
                                            {truncatePublicKey(caseItem.owner)}
                                        </div>
                                        {/* Tooltip */}
                                        <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 scale-0 transition-all duration-300 group-hover:scale-100 bg-black text-white text-xs rounded p-1">
                                            {caseItem.owner}
                                        </span>
                                    </td>
                                    <td className="p-2 flex gap-2">
                                        <button onClick={() => handleUpdate(caseItem)} className=" px-2 py-1 bg-gray-200 hover:bg-gray-100 rounded-lg">Update</button>
                                        <button onClick={() => handleDelete(caseItem.caseId)} className="px-2 py-1 hover:text-red-600 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center p-4 font-bold">
                                    No cases found. Please connect your wallet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Footer */}
                <div className="flex justify-end mt-4">
                    <button className="bg-gray-700 text-white px-4 py-2">Bulk Delete</button>
                    <button className="bg-blue-500 text-white px-4 py-2 ml-2">Export Cases</button>
                </div>

                <UpdateCaseModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleModalSubmit}
                />
            </div>
        </div>
    );
}