import { PrismaClient } from '@prisma/client'

export default async function categorySeeder(): Promise<void> {
  const client = new PrismaClient()

  const categories = [
    {
      name: 'amigurumi',
      imgUrls: ['/uploads/category/amigurumi-1729796585529.jpg']
    },
    {
      name: 'llaveros',
      imgUrls: ['/uploads/category/llaveros-1729796655644.jpg']
    },
    {
      name: 'ramos',
      imgUrls: ['/uploads/category/ramos-1729796663990.jpg']
    },
    {
      name: 'flores',
      imgUrls: ['/uploads/category/flores-1729796670766.jpg']
    }
  ]

  await client.category.createMany({ data: categories })
}
