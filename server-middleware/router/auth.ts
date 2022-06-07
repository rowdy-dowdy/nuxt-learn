import express from 'express'
const router = express.Router();

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { isName, isEmail, isPassword, removeSpace } from '../utils/validator'
import { responseError } from '../utils/response'
import { User } from '~~/types/user'
import bcrypt from 'bcrypt'
import { signToken, verifyToken } from '../utils/jwt'
// import requestIp from 'request-ip';

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
        providers: {
          select: {
            list_id: true
          }
        }
      }
    })

    if (!user) {
      throw {
        status: 404,
        message: "Email not exists"
      }
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw {
        status: 401,
        message: "Password incorrect"
      }
    }

    var list_id = user.providers?.list_id || []

    let client_ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress

    if (client_ip) {
      let index = list_id.findIndex(x => x == client_ip); 

      if (index < 0)
        list_id.push(client_ip)

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
    }

    delete user.password

    const token = await signToken(user)
    const refresh_token = await signToken(user, 86400)

    await prisma.refresh_tokens.create({
      data: {
        token: refresh_token
      },
    })

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
        text: "Incorrect data format",
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
        text: "User not exists"
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
    const refresh_token = req.body.refresh_token || req.query.refresh_token || req.cookies.refresh_token;

    const refresh_token_db = await prisma.refresh_tokens.findFirst({
      where: {
        token: refresh_token
      }
    })

    if (!refresh_token_db) {
      throw {
        status: 403,
        text: 'A token is required for authentication'
      };
    }

    const decoded = await verifyToken(refresh_token);

    const user = await prisma.users.findUnique({
      where: {
        id: decoded?.user?.id || 0
      },
      select: {
        id: true,
        name: true,
        email: true,
        providers: {
          select: {
            list_id: true
          }
        }
      }
    })

    if (!user) {
      throw {
        status: 404,
        text: "User not exists"
      }
    }

    var list_id = user.providers?.list_id || []

    let client_ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress
    
    let index = list_id.findIndex(x => x == client_ip); 

    if (!client_ip || index < 0) {
      throw {
        status: 403,
        text: 'Your ip address could not be found in the database'
      }
    }

    const token = await signToken(user)

    res.status(200).json({
      user,
      token,
      expiresIn: '1h',
      refresh_token
    });

  } catch (error) {
    // res.status(error.status || 500).json(responseError(error));
    return res.status(error.status || 401).send(responseError({
      status: error.status || 401,
      text: 'Invalid Token'
    }));
  }
}

const logout = async(req, res) => {
  try {
    const refresh_token = req.body.refresh_token || req.query.refresh_token || req.cookies.refresh_token;

    await prisma.refresh_tokens.deleteMany({
      where: {
        token: refresh_token
      }
    })

    res.cookie('refresh_token','', { maxAge: 86400, httpOnly: true });

    res.status(200).json({
      meesage: "Logout successful"
    });

  } catch (error) {
    res.status(error.status || 500).json(responseError(error));
  }
}

router.post('/login', login)
router.post('/register', register)
router.get('/me', me)
router.post('/refresh_token', refresh_token)
router.post('/logout', logout)

export default router