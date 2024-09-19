import express from "express";
import db from '@repo/db/client'
const app = express();
app.use(express.json());


app.post("/hdfcWebhook",async (req, res) => {
    //TODO: Add zod validation here?
    const paymentInformation : {
        token: string;
        userId: string;
        amount: string;
    } = {
        token : req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };
    
    //we get the information from Bank
    //Now we will Do things 
    //Update the amount in DB
    //and Store the record in Onramp Transactions table

    try{
        await db.$transaction([
        db.balance.update({
        where : {
            userId : Number(paymentInformation.userId)//This is also new
        },
        data : {
            amount : {
                increment : Number(paymentInformation.amount)*100 //This is too learn new from this
            },
            locked : {
                decrement : Number(paymentInformation.amount)*100
            }
        }
    }),

    //we have updated the Balance
    //Now we will store the record in Onramp table
     db.onRampTransaction.updateMany({
        where : {
            token : paymentInformation.token
        },
        data : {
            status : "Success"
        }
    })
]);
    //THIS IS VERY IMPORTANT BANK HAVE TO CONFIRM THAT THE AMOUNT IS CREDITED INTO THE USER-ACCOUNT
    //or else bank will again send money

    //It is important to send Correct status code and message according to the API Standards of PSD
    res.status(200).json({
        message: "Captured" //<-- Ths was importtant for Bank to verify that amount is returned 
    })
}
//we also have to catch the request
catch(err){
    console.log(err);
    res.status(411).json({
        message: "Error while processing webhook"
    })
}
})
app.get("/",(req,res) => {
    try{
        res.send("Hello World");
    }catch(err){
        console.log(err);
        res.send('request failed')
    }
})
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});