import { prisma } from "./prisma" // import your extended Prisma Client instance

async function main() {
  const stream = await prisma.notification.stream({ name: 'notification-stream'})

  for await (const event of stream) {
    console.log('New event:', event)
  }
}

main()