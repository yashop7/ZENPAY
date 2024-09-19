"use client"
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/textinput"
import { Select } from "@repo/ui/select"
import { useState } from "react";
import { createOnRampTransaction } from "../lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
},{
    name: "SBI Bank",
    redirectUrl: "https://www.onlinesbi.sbi/"
}];

export default function AddMoneyCard(){
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setamount] = useState("");
    const name = getNamefromredirectUrl(redirectUrl) || "";
    return(
    <Card title="Add Money">
            <TextInput placeholder={'Amount'} label={"Amount"} onChange={setamount} />
            <Select label={"Name"} onSelect={(value) => {
                setRedirectUrl(SUPPORTED_BANKS.find((x) => x.name == value)?.redirectUrl) //This Part was cool, Theses are the Tricks to use the compoenents
            }} options={
                SUPPORTED_BANKS.map((info) => {
                return {
                    key : info.name,
                    value : info.name
                }
            })} />
            <div className="flex justify-center">
                <button className=" bg-zinc-800 text-fuchsia-50 rounded md:p-2 md:px-5 md:text-base p-1 px-3 text-sm" onClick={async () => {
                    await createOnRampTransaction({
                        amount : amount,
                        provider : name
                    })
                    window.location.href = redirectUrl || "";
                }}>AddMoney</button>
            </div>
    </Card>
    )
}
//we have to introduce time, status, status, provider

function getNamefromredirectUrl(url : string | undefined){
    return  SUPPORTED_BANKS.find((x) => {
        return x.redirectUrl == url;
    })?.name
}