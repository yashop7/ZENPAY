import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { P2PTransactionTable } from "../../components/P2P_Transaction";


export async function getP2PRecordSendbyUser(){
    const session = await getServerSession(authOptions);
    console.log(session)
    if(!session?.user?.id){
        return []
    }
    try{
        const record = await prisma.p2pTransaction.findMany({
            where : {
                fromUserId : Number(session.user.id),
            },
        })
        console.log(session);
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
        console.log(enhancedRecords)
        
        return enhancedRecords.map((x)=> {
            return {
                timestamp : x.timestamp,
                fromUserId : x.fromUserId,
                touserId : x.toUserId,
                amount : x.amount,
                Receivernumber : x.number
            }
        })
    }catch(e){
        console.log(e)
        return []
    }
}
//These records are which sended by user


export default async function() {
    const record = await getP2PRecordSendbyUser();

    return (
        <div className="w-full ">
            <div className="max-w-2xl ">
            <P2PTransactionTable record={record} />
            </div>
        </div>
    )
}