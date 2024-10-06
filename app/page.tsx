'use client'

import CaseGrid from "./components/card/CaseGrid";
import { useRouter } from 'next/navigation';


export default function Home() {

    const router = useRouter();

    const handleCreateCase = () => {
        router.push('/create-case');
    };

    return (
        <div className="items-center justify-items-center min-h-screen p-10 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                {/* Typing animation */}
                <div className="typewriter">
                    Welcome to Blockchain Amigos! At here, you can create, collaborate and fundraise your project on Solana.
                </div>

                <button
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                    onClick={handleCreateCase}
                >
                    Create New Case
                </button>

                <CaseGrid />
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
        </div>
    );
}