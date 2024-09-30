import { useEffect, useState } from 'react';
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { getProgram, getMasterAddress, getCaseAddress } from "../utils/program";
import UpdateCaseModal from './UpdateCaseModal';

import { confirmTx } from '../utils/helper';
import CaseCard from './CaseCard';

export default function CaseGrid() {
    const [cases, setCases] = useState([]);
    const wallet = useAnchorWallet();
    const { connection } = useConnection();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCase, setSelectedCase] = useState(null);

    const fetchCases = async () => {
        if (!wallet) return;

        const program = getProgram(connection, wallet);

        try {
            const master = await program.account.master.fetch(await getMasterAddress());
            const caseCount = master.lastCaseId;

            const caseData = [];
            for (let caseId = 1; caseId <= caseCount; caseId++) {
                const caseAccount = await program.account.case.fetch(await getCaseAddress(caseId));

                if(caseAccount.title != "")
                {
                    caseData.push({
                        caseId, // Pass caseId to easily identify which case to update
                        title: caseAccount.title,
                        category: caseAccount.category,
                        description: caseAccount.description,
                        imageUrl: caseAccount.imageUrl,
                    });
                }
            }
            setCases(caseData);
        } catch (error) {
            console.error("Error fetching cases:", error);
        }
    };

    useEffect(() => {
        fetchCases(); // Fetch cases on mount
    }, [wallet, connection]);

    const handleUpdate = (caseItem: any) => {
        setSelectedCase(caseItem);
        setIsModalOpen(true);
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
    
            fetchCases(); 
    
            console.log("Case updated successfully on-chain");
    
        } catch (error) {
            console.error("Error updating case:", error);
        }

    };

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
            fetchCases(); // Re-fetch after delete
            console.log("Case deleted successfully on-chain");

        } catch (error) {
            console.error("Error deleting case:", error);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cases.length > 0 ? (
                cases.map((caseItem) => (
                    <div>
                        <CaseCard
                            key={caseItem.caseId}
                            caseItem={caseItem}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                        />
                        
                    </div>
                ))
            ) : (
                <p>No cases found.</p>
            )}

            <UpdateCaseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
            />
        </div>
    );
}
