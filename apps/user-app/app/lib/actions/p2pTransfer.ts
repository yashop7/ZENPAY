"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";
export async function p2pTransfer(amount: string , number : string){
    const session =await getServerSession(authOptions);
    if(!session?.user?.id) throw new Error ("Not authenticated");

    const otherUser = await prisma.user.findFirst({
        where : {
            number : number
        }
    })

    if(!otherUser){
        return {
            message :  "User not found"
        }
    }
    try{

//EITHER WE CAN DO WITH ARRAY , FOR SEQUENCE WISE OR ELSE WE CAN REMOVE ARRAY , IT WORKS FINE

        // await prisma.$transaction([
        //     prisma.balance.update({
        //         where: {
        //             userId : Number(session.user.id)
        //         },
        //         data: {
        //             amount : {
        //                 decrement : Number(amount)
        //             }
        //         }
        //     }),
        //     prisma.balance.update({
        //         where : {
        //             userId : otherUser.id
        //         },
        //         data : {
        //             amount : {
        //                 increment : Number(amount)
        //             }
        //         }
        //     }),
        // ])

        await prisma.$transaction(async (tx) => {

            //WHY WE HAVE ADDED THIS LINE BECAUSE EVEN IF SOMEONE INPUT 
            //we are doing DB Locking // means when the First transaction is completed by the User
            // only then the other request will start until then It will  wait for that Transaction to be Completed

            // This is the important Part 
            //as If user send 2 times reuqest very Fast
            // BOTH will run parallely 
            //This can happen if there is not enough balance in user account after the First request
            //Still it will lead to deuction of amount from User account
            //This can result in -ve balnce of User as Check is passed by 2nd USER
            

            //REMEMBER WHAT WE ARE DOING IS THAT PROCESSING EACH REQUEST ONE BY ONE SO THAT after each request 
            //we will again check for enough balance in user account 

            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${Number(session.user.id)} FOR UPDATE`;
            
            
            //Is there enough balance in the sender's account
            console.log("Checking  Balance");
            const SenderBalance = await tx.balance.findFirst({
                where : {
                    userId : Number(session.user.id)
                }
            })

            if(!SenderBalance || SenderBalance.amount < Number(amount)){
                return {
                    message : "Insufficient Balance"
                }
            }

            console.log("Deducting user balance")
            await tx.balance.update({
                where: {
                    userId : Number(session.user.id)
                },
                data: {
                    amount : {
                        decrement : Number(amount)*100
                    }
                }
            })
            
            console.log("Updating other user balance")
            await tx.balance.update({
                where : {
                    userId : otherUser.id
                },
                data : {
                    amount : {
                        increment : Number(amount)*100
                    }
                }
            })
            
            //adding Entry in the p2pTable

            await tx.p2pTransaction.create({
                data : {
                    timestamp : new Date(),
                    amount : Number(amount)*100, //these are going to be store it in Paise
                    fromUserId : Number(session.user.id),
                    toUserId : Number(otherUser.id)
                }
            })
        }
        )
    }catch(err){
        console.log(err);
        return {
            message : "Request Failed"
        }
    }
}