import { useEffect, useState } from 'react';
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { getProgram, getMasterAddress, getCaseAddress } from "../utils/program";
import CaseCard from './CaseCard';

export default function CaseGrid() {
    const [cases, setCases] = useState([]);
    const wallet = useAnchorWallet();
    const { connection } = useConnection();

    const fetchCases = async () => {
        if (!wallet) return;

        const cachedCases = localStorage.getItem("cachedCases");
        const lastFetched = localStorage.getItem("lastFetched");
    
        const cacheExpiry = 5 * 60 * 1000;
        if (cachedCases && lastFetched && Date.now() - parseInt(lastFetched) < cacheExpiry) {
            setCases(JSON.parse(cachedCases));
            return;
        }

        const program = getProgram(connection, wallet);

        try {
            console.log("fetching from the blockchain");
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

            localStorage.setItem("cachedCases", JSON.stringify(caseData));
            localStorage.setItem("lastFetched", Date.now().toString());
            setCases(caseData); 
        } catch (error) {
            console.error("Error fetching cases:", error);
        }
    };

    useEffect(() => {
        fetchCases(); // Fetch cases on mount
    }, [wallet, connection]);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cases.length > 0 ? (
                cases.map((caseItem) => (
                    <div>
                        <CaseCard
                            key={caseItem.caseId}
                            caseItem={caseItem}
                        />
                    </div>
                ))
            ) : (
                <div className='font-bold'>Please Connect Your Wallet to Start <span className='text-purple-700 font-bold'>↗️</span> </div>
            )}


        </div>
    );
}
