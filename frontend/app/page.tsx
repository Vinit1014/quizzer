import LeaderBoard from "@/components/LeaderBoard";
import Upvotebutton from "@/components/Upvotebutton";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default function Home() {
  const prismaImp = async()=>{ 
    const user = await prisma.users.findMany(
      {
        select:{
          name: true,
          points: true
      }
      }
    )
    console.log(user);
    return user;
    
  }
    const user = prismaImp()
    .catch(e=>{
      console.log(e.message);
    })
    .finally(async()=>{
      await prisma.$disconnect()
  })

    return (
    <main className="h-screen flex-col items-center justify-between p-24">
      <LeaderBoard/>
      <Upvotebutton userArray={user}/>
    </main>
  );
}

// await prisma.users.deleteMany()
// const user = await prisma.users.createMany({
//   data:[
//     {
//       name:"Vinit",
//       points: 20
//     },
//     {
//       name:"Neel",
//       points: 30
//     }
//   ]
// })
