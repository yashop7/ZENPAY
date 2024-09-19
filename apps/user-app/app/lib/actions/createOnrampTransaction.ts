"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { OnRampStatus } from "../../(dashboard)/transfer/page";
import prisma from "@repo/db/client";

export async function createOnRampTransaction({
  amount,
  provider,
}: {
  amount: string;
  provider: string;
}) {
  const session = await getServerSession(authOptions);
  console.log("This is the amount " + amount + " by the Bank" + provider);
  const random = Math.random() * Math.random() * 10000;

  //WE CAN DO THIS BY DEUCTING THE AMOUNT SIDE BY SIDE FROM USER BANNK AND INCREMENT INTO THE USER ACCOUNT
  try {
    //we will just set it to Processing
    const transaction = await prisma.onRampTransaction.create({
      data: {
        status: OnRampStatus.Processing,
        startTime: new Date(),
        amount: Number(amount) * 100,
        provider: provider,
        userId: Number(session.user.id),
        token: random.toString(),
      },
    });
    if (!transaction) {
      throw Error("Transaction failed");
    }
    return {
      message: "Done",
    };
    //     await prisma.$transaction([
    //     prisma.onRampTransaction.create({
    //         data : {
    //             status : OnRampStatus.Success,
    //             startTime : new Date(),
    //             amount : amount * 100,
    //             provider : provider,
    //             userId : Number(session.user.id),
    //             token : random.toString()
    //         }
    //     }),
    //     prisma.balance.update({
    //         where : {
    //             userId : Number(session.user.id)
    //         },
    //         data : {
    //             amount : {
    //                 increment : Number(amount)*100
    //             },
    //             locked : {
    //                 decrement : Number(amount)*100
    //             }
    //         }
    //     })
    // ])
    // console.log('Process Executed');
  } catch (e) {
    console.log(e);
    return {
      message: "Request failed",
    };
  }
}
