'use client'

import { useState } from 'react';
import Image from 'next/image';
import GameDetails from './GameDetails';

interface Game {
    id: number;
    name: string;
    tag: string;
    image: string;
    description: string,
}

export default function CoCreator() {
    const [hovered, setHovered] = useState(false);
    const [selectedGame, setSelectedGame] = useState<Game | null>(null); // Define Game type here

    const games: Game[] = [
        { id: 1, name: 'Black :Wukong', tag: 'Beta', image: '/fig/Fig1.jpg', description: "" },
        { id: 2, name: 'Super Mario', tag: 'Beta', image: '/fig/Fig2.jpg', description: "" },
        { id: 3, name: 'Pokémon', tag: 'Beta', image: '/fig/Fig3.jpg', description: "" },
        { id: 4, name: 'Naraka', tag: 'Beta', image: '/fig/Fig4.jpg', description: "" },
        { id: 5, name: 'Frost Punk 2', tag: 'Beta', image: '/fig/frostpunk.png', description: "" },
        { id: 6, name: 'Planet Coaster', tag: 'Alpha', image: '/fig/planet_coaster.png', description: "" },
        { id: 7, name: 'Final Fantasy', tag: 'Beta', image: '/fig/fantasy.png', description: "" },
        { id: 8, name: 'Cyberpunk', tag: 'Alpha', image: '/fig/cyberpunk.png', description: "" },
    ];

    return (
        <div className="mx-20 my-5 text-gray-800">
            <h1 className="text-2xl font-bold text-gray-800 mb-5">Games Are Ready To Play</h1>

            <div className="grid grid-cols-8 gap-4 mb-5">
                {games.map((game) => (
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