import { PrismaClient } from '@prisma/client'
import userSeeder from './user.seed'
const prisma = new PrismaClient()

async function main() {
  await userSeeder()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
  })
