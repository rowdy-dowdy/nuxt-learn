import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  const staffs = await prisma.staffs.findMany()

  return { staffs }
})