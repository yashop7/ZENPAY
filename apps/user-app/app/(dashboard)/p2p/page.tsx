import { getServerSession } from "next-auth";
import SendCard from "../../components/SendCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { P2PTransactionTable } from "../../components/P2P_Transaction";

export interface P2Precord {
    timestamp : Date, 
    fromUserId : number,
    touserId : number,
    amount : number,
    Receivernumber : string | undefined
}

export async function getP2PRecordSendbyUser(){
    const session = await getServerSession(authOptions);
    if(!session?.user?.id){
       return []
    }
    const record = await prisma.p2pTransaction.findMany({
        where : {
            fromUserId : Number(session.user.id),
        },
    })
    const ReceiverphoneNumberrecord = record.map(async (x) => { //This is very good Approach, To join Both arrays 

        const receiver = await prisma.user.findUnique({
            where: {
                id: x.toUserId,
            },
            select: {
                number: true,
            },
        });

        return {
            ...x,  
            number: receiver?.number,
        };
    });

    // Wait for all promises in ReceiverphoneNumberrecord to resolve
    const enhancedRecords = await Promise.all(ReceiverphoneNumberrecord); //This i will take Care off
    
    
    return enhancedRecords.map((x)=> {
        return {
            timestamp : x.timestamp,
            fromUserId : x.fromUserId,
            touserId : x.toUserId,
            amount : x.amount,
            Receivernumber : x.number
        }
    })
}
//These records are which sended by user

export default async function P2P(){
    const record = await getP2PRecordSendbyUser();
    return(
        <div className="flex justify-center items-center w-full">
            <div className="w-full max-w-lg px-4">
            <SendCard />
            </div>
        </div>
    )
}