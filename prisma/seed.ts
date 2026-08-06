// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // example seed players (minimal)
  await prisma.player.upsert({
    where: { externalId: 'player_jerry_rice' },
    update: {},
    create: {
      externalId: 'player_jerry_rice',
      name: 'Jerry Rice',
      primaryPosition: 'WR',
      activeStart: 1985,
      activeEnd: 2004,
      metadata: {}
    }
  })

  await prisma.player.upsert({
    where: { externalId: 'player_tom_brady' },
    update: {},
    create: {
      externalId: 'player_tom_brady',
      name: 'Tom Brady',
      primaryPosition: 'QB',
      activeStart: 2000,
      activeEnd: 2022,
      metadata: {}
    }
  })

  console.log('Seed complete')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
