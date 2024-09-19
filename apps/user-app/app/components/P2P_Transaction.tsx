import { Card } from "@repo/ui/card";
import { P2Precord } from "../(dashboard)/p2p/page"; //This is an interface
import { GridBackgroundDemo } from "./GridBackgroundDemo";

export function P2PTransactionTable({record} : {record : P2Precord[] }){
    console.log(record);
    return (
        <div>
            <Card title="Transactions">
            <div className="flex justify-between py-3">
                <div className="flex items-center">
                    <div className="font-semibold text-lg">Recceiver</div>
                </div>
                <div className="flex flex-col mr-5">
                    <div className="text-lg font-semibold ">Balance</div>
                </div>
            </div>
            
                <div>
                    {record.map((x) => {
                        return (
                            <div key={x.amount*Math.random()} className="flex justify-between py-3">
                                <div className="flex items-center">
                                    <div className="text-lg border-b-2">{x.Receivernumber}</div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="text-lg font-medium">-{Number(x.amount)/100}</div>
                                    <div className="text-xs font-semibold">{x.timestamp.toDateString()}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div></div>
            </Card>
            <div>
            </div>

        </div>
    )
}
// export interface P2Precord {
//     timestamp : Date, 
//     fromUserId : number,
//     touserId : number,
//     amount : number
// }