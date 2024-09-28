import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/bcrypt'
export default async function userSeeder(): Promise<void> {
  const client = new PrismaClient()
  const [, password] = await hashPassword(process.env.SUDO_PASSWORD!)

  await client.user.upsert({
    where: { email: process.env.SUDO_EMAIL! },
    update: {
      password: password!,
      role: ['SUDO', 'CLIENT', 'ADMIN']
    },
    create: {
      email: process.env.SUDO_EMAIL!,
      password: password!,
      role: ['SUDO', 'CLIENT', 'ADMIN']
    }
  })
}
