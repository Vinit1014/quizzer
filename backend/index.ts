import { prisma } from "./prisma" // import your extended Prisma Client instance

async function main() {

    const subscription = await prisma.players.subscribe()
}

main()

//   const stream = await prisma.players.stream({ name: 'notification-stream'})

//   for await (const event of stream) {
//     console.log('New event:', event)
//   }