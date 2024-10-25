import { PrismaClient } from '@prisma/client'
import userSeeder from './user.seed'
import categorySeeder from './category.seed'
import productSeeder from './products.seed'
const prisma = new PrismaClient()

async function main() {
  await categorySeeder()
  await productSeeder()
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
