import { Card } from "@repo/ui/card";
import { useState } from "react";
import AddMoneyCard from "../../components/AddMoneyCard";
import { BalanceCard } from "../../components/BalanceCard";
import { OnRampTransaction } from "../../components/OnRampTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client"

export enum OnRampStatus {
    Success = "Success",
    Failure = "Failure",
    Processing = "Processing",
  }

export interface TransactionsInterface {
    time : Date;
    amount : number;
    status : OnRampStatus;
    provider : string;
}

const SET : TransactionsInterface[] = [{
    time: new Date(),
    status: OnRampStatus.Success,
    provider: "YASH",
    amount: 1234
},{
    time: new Date(),
    status: OnRampStatus.Failure,
    provider: "BHAVYA",
    amount: 5678
}]

async function GetBalance(){
    const session =await  getServerSession(authOptions);
    if(!session?.user?.id){
        return {
            amount : 0,
            locked : 0
        }
    }
    // { user: { name: null, email: 'lknlwkegb', image: undefined, id: '5' } }
    const balance =await prisma.balance.findFirst({
        where : {
            userId : Number(session?.user?.id) // This is the number 
        },
    })
    return {
        amount : balance?.amount || 0,
        locked : balance?.locked || 0
    }
}

async function OnrampTransactions(){
    const session =await getServerSession(authOptions);
    if(!session?.user?.id){
        return []
    }
    // { user: { name: null, email: 'lknlwkegb', image: undefined, id: '5' } }

    const transactions =await prisma.onRampTransaction.findMany({   //<-- THIS IS AN ARRAY
        where : {
            userId : Number(session?.user?.id) // This is the number 
        },
    })
    return transactions.map((x) => {   
           //<--LEARN FROM THIS HOW TO WRAP CONTENT INTO OBJECT
        return {
            time: x.startTime,
            amount: x.amount,
            status: x.status as OnRampStatus, // Ensure status is mapped correctly,
            provider: x.provider
        }
    })
}
export default async function() {
   const balance = await GetBalance();
   const OnRampTxn : TransactionsInterface[] = await OnrampTransactions();
    return (<div className="grid grid-cols-6 w-full">
        <div className="col-span-3">
            <div className="text-[#6a51a6] md:text-5xl p-7 font-semibold sm:text-4xl text-3xl">Transfer</div>
            <div><AddMoneyCard /></div>
        </div>
        <div className="col-span-3 flex flex-col ">
            <div><BalanceCard amount ={balance.amount} locked={balance.locked}/></div>
            <div><OnRampTransaction transactions={OnRampTxn}/></div>
        </div>
    </div>)
}
// This is what we get in Client Session
// {"data":{"user":{"name":"yash","email":"yash@gmail.com","id":"user1"},"expires":"2024-05-22T13:53:39.339Z"},"status":"authenticated"}
// This is what we get in Server Session
// {"user":{"name":"yash","email":"yash@gmail.com","id":"user1"}}

//status of transactions are not matching like OnrampTransactions(),

// transactions: {
//         time: Date;
//         status: OnRampStatus;
//         provider: string;
//         amount: number;
//     }[];


// const OnRampTxn: {                                                                                                                    
//     time: Date;                                                                                         
//     amount: number;                                                     
//     status: $Enums.OnRampStatus;                                                                    
//     provider: string;                                                                               
// }[]                                                                                                 

//status is not matching , I have to make a common type