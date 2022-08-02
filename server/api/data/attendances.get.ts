import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const query = useQuery(event)

  let first_day = <string | null>query?.first_day || null,
      last_day = <string | null>query?.last_day || null

  var attendances = null

  if (first_day && last_day) {
    attendances = await prisma.attendances.findMany({
      where: {
        record_time: {
          lte: new Date(last_day),
          gte: new Date(first_day)
        }
      }
    })
  }
  else {
    attendances = await prisma.attendances.findMany()
  }

  return { 
    attendances,
    first_day,
    last_day 
  }
})