import { Card } from "@repo/ui/card"
import { TransactionsInterface } from "../(dashboard)/transfer/page"
import { OnRampStatus } from "../(dashboard)/transfer/page"
export const OnRampTransaction = ({transactions} : { transactions :  TransactionsInterface[]}) => {
    if(!transactions.length){
        return (
            <Card title="Recent Transactions">
                <div className="p-6 text-center text-lg">No Recent transactions</div>
            </Card>
        )
    }
    return (
        <div>
            <Card title="Recent Transactions">
                <div className="pt-2">
                    {/* Loop through the transaction data */}
                    {transactions.map((x) => {
                        return(
                            <div key={x.amount*Math.random()} className="flex justify-between py-2"> {/*we have also defined key in here*/}
                                <div>
                                <div className="font-normal">{x.provider}</div>
                                <div className={`text-xs font-bold font-serif ${x.status === OnRampStatus.Success? "text-green-500" : (x.status === OnRampStatus.Processing)? "text-blue-500" : "text-red-500"  }  `} >{x.status}</div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="font-semibold text-sm">+Rs {x.amount/100}</div>
                                    <div className="text-xs">{x.time.toDateString()}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Card>
        </div>
    )
}