import { AnchorProvider, BN, Program, Idl } from "@project-serum/anchor";
import { PublicKey, LAMPORTS_PER_SOL, Connection } from "@solana/web3.js";

import IDL from "./idl.json";
import {
    MASTER_SEED,
    PROGRAM_ID,
    CASE_SEED,
} from "./constants";
import { AnchorWallet } from "@solana/wallet-adapter-react";

export const getProgram = (connection: Connection, wallet: AnchorWallet) => {
    const provider = new AnchorProvider(connection, wallet, {
        commitment: "confirmed",
    });

    const program = new Program(IDL as Idl, PROGRAM_ID, provider);
    return program;
};

export const getMasterAddress = (): PublicKey => {
    return PublicKey.findProgramAddressSync(
        [Buffer.from(MASTER_SEED)], 
        PROGRAM_ID
    )[0];       
};

export const getCaseAddress = (id: number) : PublicKey => {
    return PublicKey.findProgramAddressSync([
        Buffer.from(CASE_SEED), 
        new BN(id).toArrayLike(Buffer, "le", 4)],
        PROGRAM_ID)[0];
}

// export const getTicketAddress = async (LotteryPk: PublicKey, id: number) => {
//     return PublicKey.findProgramAddressSync(

//         [
//             Buffer.from(TICKET_SEED),
//             LotteryPk.toBuffer(),
//             new BN(id).toArrayLike(Buffer, "le", 4),
//         ],
//         PROGRAM_ID)[0]
// }

