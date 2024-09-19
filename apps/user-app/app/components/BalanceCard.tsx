import { Card } from "@repo/ui/card"
export const BalanceCard = ({amount,locked} : {
    amount : number,
    locked : number
}) => {                         //NOTE THE AMOUNT IS IN PAISE
    return (
        <Card title={"Balance"}>
            <div className="flex flex-col">
            <Display amount={amount/100} label="Unlocked Balance"/>
            <Display amount={locked/100} label="Total Locked Balance"/>
            <Display amount={(amount + locked)/100} label="Total Balance"/>
            </div>
        </Card>
    )
}

const Display = ({label , amount} : {amount : number ,  label : string }) => {
    return (
        <div className="flex justify-between w-full border-b-2 border-neutral-200 py-3">
            <div className="text-md font-normal ">{label}</div>
            <div className="text-md font-semibold">{amount} INR</div>
        </div>
    )
}