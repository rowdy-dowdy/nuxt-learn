import express from 'express'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()
const app = express()

app.use(express.json())

/** 
* logic for our api will go here
*/

app.get(`/api/test`, async (req, res) => {
  // const result = await prisma.user.create({
  //   data: {
  //     email: req.body.email,
  //     name: req.body.name,
  //   },
  // })
  res.json("user")
})

export default app