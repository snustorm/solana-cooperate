import Image from 'next/image';

interface GameDetailsProps {
  game: {
    name: string;
    description: string;
    token: string;
    author: string;
    versionImage: string;
  };
}

const GameDetails: React.FC<GameDetailsProps> = ({ game }) => {
  return (
    <div className="mt-10 space-y-10">
      {/* Basic Information and Latest Version Section */}
      <div className="flex justify-between space-x-10 pt-5">
        {/* Left Section */}
        <div className="w-1/2 bg-white">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">{game.name}</h2>
          <p className="mb-4">{game.description}</p>
          <p className="mb-4"><strong>Token:</strong> {game.token}</p>
          <p className="mb-4"><strong>Author:</strong> {game.author}</p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-6 bg-white shadow-lg ">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Latest Version</h2>
          <p className="mb-4"><strong>Version Code:</strong> 1.2.2</p>
          <Image src={game.versionImage} alt="Version Tree" width={300} height={200} className="mb-4" />
          <button className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-600 transition w-full">
            Play 
          </button>
          <button className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-600 transition w-full">
            Download
          </button>
          <p className="mt-4 text-gray-600">
            Handling different versions: Synchronizing features and maintaining stability across versions.
          </p>
        </div>
      </div>

      {/* Contribution History Section */}
      <div className="p-6 bg-white ">
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Contribution History</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Version 1:</strong> Core mechanics and gameplay foundations.</li>
          <li><strong>Version 1.1:</strong> Improved graphics and bug fixes.</li>
          <li><strong>Version 1.2:</strong> UI enhancements and audio improvements.</li>
          <li><strong>Version 1.2.1:</strong> Additional levels and story content.</li>
          <li><strong>Version 1.2.2:</strong> Performance optimizations and new quests.</li>
        </ul>
      </div>
    </div>
  );
}

export default GameDetails;