"use client"

import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textinput"
import { useState } from "react";
import { p2pTransfer } from "../lib/actions/p2pTransfer";

export default function SendCard(){
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    return (
        <div>
            <Card title="Send">
                <TextInput label="Number" placeholder="Number" onChange={setNumber}/>
                <TextInput label="Amount" placeholder="amount" onChange={setAmount}/>
                <div className="flex justify-center">
                <button className="bg-gray-800 text-fuchsia-50 rounded border-0 p-2 px-5 text-base  hover:bg-white hover:text-gray-800 hover:border-gray-800 hover:border-2 hover:font-medium " onClick={async () => {
                    await p2pTransfer(amount, number);
                }}>Send</button>
                </div>
            </Card>
        </div>
    )
}