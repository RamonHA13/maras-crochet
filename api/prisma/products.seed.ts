import { PrismaClient } from '@prisma/client'

export default async function productSeeder(): Promise<void> {
  const client = new PrismaClient()

  const products = [
    {
      name: 'amigurumi Dead pool',
      price: 396,
      description: 'Figura crochet del personaje de marvel Dead Pool.',
      imgUrls: ['/uploads/product/Amigurumi-DeadPool-1729796855052.png'],
      inStock: true,
      category_id: 1
    },
    {
      name: 'hello kitty',
      price: 255,
      description: 'Figura crochet del personaje Hello kitty',
      imgUrls: ['/uploads/product/hello-kitty-1729818825284.png'],
      inStock: true,
      category_id: 1
    }
  ]

  await client.product.createMany({ data: products })
  console.log('Categories seeded successfully')
}
