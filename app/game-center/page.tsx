'use client'

import { useState } from 'react';
import Image from 'next/image';
import GameDetails from './GameDetails';
import gameData, { Game } from './gamesData';

export default function CoCreator() {
    const [hovered, setHovered] = useState(false);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null); // Define Game type here

    return (
        <div className="mx-20 my-5 text-gray-800">
            <h1 className="text-2xl font-bold text-gray-800 mb-5">Games Are Ready To Play</h1>

            <div className="grid grid-cols-8 gap-4 mb-5">
                {gameData.map((game) => (
                    <div
                        key={game.id}
                        className="bg-white shadow-md rounded-lg h-56 flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                        onMouseEnter={() => { setHovered(true); setSelectedGame(game); }}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <div className="relative w-full h-2/3 overflow-hidden rounded-t-lg">
                            <Image
                                src={game.image}
                                alt={game.name}
                                fill
                                objectFit="cover"
                                className="absolute inset-0 w-full h-full"
                            />
                        </div>
                        <div className="text-center h-1/3 p-2 flex flex-col justify-center">
                            <p className="text-sm font-semibold mb-1">{game.name}</p>
                            <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                    game.tag === 'Beta'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-500 text-white'
                                }`}
                            >
                                {game.tag}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Arrow-Down */}
            <div className={`absolute left-1/2 transform -translate-x-1/2 ${hovered ? 'animate-bounce' : ''}`}>
                <svg
                    className="w-8 h-8 text-gray-400 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {selectedGame && <GameDetails game={selectedGame} />}
        </div>
    );
}