import express from 'express'
const router = express.Router();

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { isName, isEmail, isPassword, removeSpace } from '../utils/validator'
import { responseError } from '../utils/response';
import { User } from '~~/types/user';
import bcrypt from 'bcrypt'
import { signToken, verifyToken } from '../utils/jwt'

const login = async (req, res) => {
  try {
    let email: string = removeSpace(req.body?.email ?? ''),
        password: string = req.body?.password ?? ''

    var user = await prisma.users.findUnique({
      where: {
        email: email
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        providers: true
      }
    })

    if (!user) {
      throw {
        status: 404,
        message: "Email not exists"
      }
    }

    var list_id = user.providers?.list_id || []

    console.log(req.headers['x-forwarded-for'], req.ip, res.ips)

    return

    // update list id
    await prisma.users.update({
      where: {id: user.id},
      data: {
        providers: {
          // update or create 
          upsert: {
            create: {
              list_id: list_id
            },
            update: {
              list_id: list_id
            },
          },
          }
      }
  })

    if (!await bcrypt.compare(password, user.password)) {
      throw {
        status: 401,
        message: "Password incorrect"
      }
    }

    delete user.password

    const token = await signToken(user)
    const refresh_token = await signToken(user, 86400)
    res.cookie('refresh_token',refresh_token, { maxAge: 86400, httpOnly: true });

    res.status(200).json({
      user,
      token,
      expiresIn: '1h',
      refresh_token
    });

  } catch (error) {
    console.log(error)
    res.status(error.status || 500).json(responseError(error));
  }
}

const register = async (req, res) => {
  try {
    let name: string = removeSpace(req.body?.name ?? ''),
        email: string = removeSpace(req.body?.email ?? ''),
        password: string = req.body?.password ?? ''
    
    let error_details = []

    if (!isName(name)) {
      error_details.push({
        field: "name",
        text: "Incorrect name field format"
      })
    }

    if (!isEmail(email)) {
      error_details.push({
        field: "email",
        text: "Incorrect email field format"
      })
    }

    if (!isPassword(password)) {
      error_details.push({
        field: "password",
        text: "Incorrect password field format"
      })
    }

    if (error_details.length > 0) {
      throw {
        status: 400,
        message: "Incorrect data format",
        details: error_details
      }
    }

    var user: User | null = await prisma.users.findUnique({
      where: {
        email: email
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    if (user) {
      throw {
        status: 400,
        message: "Email already exists"
      }
    }

    const hash_password = await bcrypt.hash(password,10)

    user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: hash_password
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })
    
    res.status(200).json({
      user
    });

  } catch (error) {
    res.status(error.status || 500).json(responseError(error));
  }
}

const me = async (req, res) => {
  try {
    var user = await prisma.users.findUnique({
      where: {
        id: req?.user?.id || 0
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    if (!user) {
      throw {
        status: 404,
        message: "User not exists"
      }
    }

    res.status(200).json({
      user
    });

  } catch (error) {
    res.status(error.status || 500).json(responseError(error));
  }
}

const refresh_token = async(req, res) => {
  try {
    var user = await prisma.users.findUnique({
      where: {
        id: req?.user?.id || 0
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    if (!user) {
      throw {
        status: 404,
        message: "User not exists"
      }
    }

    res.status(200).json({
      user
    });

  } catch (error) {
    res.status(error.status || 500).json(responseError(error));
  }
}

router.post('/login', login)
router.post('/register', register)
router.get('/me', me)
router.post('/refresh_token', refresh_token)

export default router