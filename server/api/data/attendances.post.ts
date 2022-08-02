import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import ZKLib from 'zklib-js'

export default defineEventHandler(async () => {
  let zkInstance = new ZKLib('192.168.1.201', 4370, 5200, 5000);

  await zkInstance.createSocket()

  const data_attendances = await zkInstance.getAttendances()

  const data_create = data_attendances.data.reduce((pre,cur) => {
    return [...pre, {
      staff_uid: parseInt(cur.deviceUserId),
      record_time: new Date(cur.recordTime)
    }]
  },[])

  const staffs = await prisma.staffs.findMany()

  const data_create_filter = data_create.filter(v => staffs.findIndex(v2 => v2.uid == v.staff_uid) >= 0)

  const attendances = await prisma.attendances.createMany({
    data: data_create_filter,
    skipDuplicates: true
  })

  return { 
    message: 'Thành công',
    attendances
  }
})