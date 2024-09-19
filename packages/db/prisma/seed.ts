import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as process from 'process';

//inserting Data in the prisma
async function main(){

    //It is for if already the entry exists then it will update it or else it will make a new entry

    const alice = await prisma.user.upsert({
        where : {
            number : '7777777'
        },
        update : {},
        create : {
            name  : 'YOYO',
            number : '123509344',
            password: await bcrypt.hash('alice', 10),
            OnRampTransaction : {
                create : {
                    startTime: new Date(),
                    status: "Success",
                    amount: 20000,
                    token: "12232",
                    provider: "HDFC Bank",
                }
            }
        }
    })
    const bob = await prisma.user.upsert({
        where: { number: '9999999998' },
        update: {},
        create: {
          number: '99999572398',
          password: await bcrypt.hash('bob', 10),
          name: 'bob',
          OnRampTransaction: {
            create: {
              startTime: new Date(),
              status: "Failure",
              amount: 2000,
              token: "123573",
              provider: "HDFC Bank",
            },
          },
        },
    })
    console.log({alice, bob});
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.log(e);
    await prisma.$disconnect()
    process.exit(1); //This is running Fine, Just giving error ,I DON'T KNOW WHY ?
})

//WATCH THIS HOW TO CREATE THE DATA AND HOW TO SEED THE DATA IN THE TABLE