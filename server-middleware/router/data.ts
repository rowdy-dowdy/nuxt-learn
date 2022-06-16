import express from 'express'
const router = express.Router();

import { PrismaClient } from '@prisma/client'
import { responseError } from '../utils/response';
const prisma = new PrismaClient()

import ZKLib from 'zklib-js'

const getAllStaff = async (req, res) => {
  try {
    const staffs = await prisma.staffs.findMany()

    res.status(200).json({
      staffs: staffs,
    });

  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json(responseError(error));
  }
}

const addStaff = async (req, res) => {
  try {
    let zkInstance = new ZKLib('192.168.1.201', 4370, 5200, 5000);

    await zkInstance.createSocket()

    const data_staffs = await zkInstance.getUsers()

    const data_create = data_staffs.data.reduce((pre,cur) => {
      return [...pre, {
        uid: cur.uid,
        name: cur.name,
        role: cur.role
      }]
    },[])

    const staffs = await prisma.staffs.createMany({
      data: data_create,
      skipDuplicates: true
    })

    console.log(staffs)

    res.status(200).json({
      message: 'Thành công',
      staffs: staffs,
    });

  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json(responseError(error));
  }
}

const getAttendances = async (req, res) => {
  try {
    let first_day = req.query?.first_day || null,
        last_day = req.query?.last_day || null

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

    res.status(200).json({
      attendances,
      first_day,
      last_day
    });

  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json(responseError(error));
  }
}

const addAttendances = async (req, res) => {
  try {
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

    res.status(200).json({
      message: 'Thành công',
      attendances
    });

  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json(responseError(error));
  }
}

router.get('/staffs', getAllStaff)
router.post('/staffs', addStaff)
router.get('/attendances', getAttendances)
router.post('/attendances', addAttendances)

export default router