import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async () => {
  const deleteUsers = prisma.users.deleteMany()

  // The transaction runs synchronously so deleteUsers must run last.
  await prisma.$transaction([deleteUsers])

  return "Mission Completed"
})