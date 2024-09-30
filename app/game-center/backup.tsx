import Image from "next/image";


export default function Old () {
    
    

    return (
        <div className="flex justify-center gap-10">
        {/* Column 1: All Games */}
        <div className="w-1/2 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">🎮 All Games</h2>

          {/* Work 1 */}
          <div className="mb-10">
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md mb-2">
              <span className="text-lg font-medium">Work 1</span>
            </div>
            <Image src="/fig/Fig1.jpg" alt="Black Myth: Wukong" width={300} height={200} className="w-full h-48 object-cover rounded-lg mb-4" />
            <p className="text-sm text-gray-600 mb-4">Black Myth: Wukong - An action-adventure game based on Chinese mythology.</p>
            <a href="/games/work1" className="inline-block text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md font-semibold transition">Detail</a>
          </div>

          {/* Work 2 */}
          <div>
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md mb-2">
              <span className="text-lg font-medium">Work 2</span>
            </div>
            <Image src="/fig/Fig2.jpg" alt="Super Mario" width={300} height={200} className="w-full h-48 object-cover rounded-lg mb-4" />
            <p className="text-sm text-gray-600 mb-4">Super Mario - A classic platformer game featuring the iconic plumber.</p>
            <a href="#" className="inline-block text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md font-semibold transition">Detail</a>
          </div>
        </div>

        {/* Column 2: My Games */}
        <div className="w-1/2 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">My Games</h2>

          {/* Work 3 */}
          <div className="mb-10">
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md mb-2">
              <span className="text-lg font-medium">Work 3</span>
            </div>
            <Image src="/fig/Fig3.jpg" alt="Pokémon" width={300} height={200} className="w-full h-48 object-cover rounded-lg mb-4" />
            <p className="text-sm text-gray-600 mb-4">Pokémon - A role-playing game where players catch and train creatures.</p>
            <a href="#" className="inline-block text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md font-semibold transition">Detail</a>
          </div>

          {/* Work 4 */}
          <div>
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md mb-2">
              <span className="text-lg font-medium">Work 4</span>
            </div>
            <Image src="/fig/Fig4.jpg" alt="Naraka: Bladepoint" width={300} height={200} className="w-full h-48 object-cover rounded-lg mb-4" />
            <p className="text-sm text-gray-600 mb-4">Naraka: Bladepoint - A multiplayer action game with martial arts combat.</p>
            <a href="#" className="inline-block text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md font-semibold transition">Detail</a>
          </div>
        </div>
      </div>
    );
};