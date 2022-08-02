import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import ZKLib from 'zklib-js'

export default defineEventHandler(async () => {
  let zkInstance = new ZKLib('192.168.1.201', 4370, 5200, 5000);

  await zkInstance.createSocket()

  const data_staffs = await zkInstance.getUsers()

  const data_create = data_staffs.data.reduce((pre, cur) => {
    return [...pre, {
      uid: cur.uid,
      name: cur.name,
      role: cur.role
    }]
  }, [])

  const staffs = await prisma.staffs.createMany({
    data: data_create,
    skipDuplicates: true
  })

  return {
    message: 'Thành công',
    staffs: staffs,
  }
})