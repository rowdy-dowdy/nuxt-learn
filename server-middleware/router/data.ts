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

    console.log(data_create)

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
    const attendances = await prisma.attendances.findMany()

    res.status(200).json({
      attendances
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

    console.log('2')

    const attendances = await prisma.attendances.createMany({
      data: data_create,
      skipDuplicates: true
    })

    console.log('3')

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