import Link from "next/link";
import { WalletButton } from "./wallet/AppWalletProvider";


export default function Navbar() {
    return (
      <nav className="bg-white border-b border-gray-200 p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left Section: Dice Icon + Title */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-lg font-semibold">
              Solana Game Collaboration Platform
            </Link>
          </div>
  
          {/* Right Section: Links and Wallet Button */}
          <div className="flex items-center justify-start space-x-4">
            <Link href="/" className="hover:text-gray-600">
              Home
            </Link>
            <Link href="/create-case" className="hover:text-gray-600">
              Founder
            </Link>
            <Link href="/co-creator" className="hover:text-gray-600">
              Co-Creator
            </Link>
            <Link href="/game-center" className="hover:text-gray-600">
              Game-Center
            </Link>
            <WalletButton />
          </div>
        </div>
      </nav>
    );
  }