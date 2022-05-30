import express from 'express'
const app = express()

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

import authRoutes from './router/auth'

app.use("/api/auth", authRoutes);

import { PrismaClient } from '@prisma/client'
import { responseError } from './utils/response';
const prisma = new PrismaClient()

const router = express.Router();

router.get('/clear', async(req,res) => {
  const deleteUsers = prisma.users.deleteMany()

  // The transaction runs synchronously so deleteUsers must run last.
  await prisma.$transaction([deleteUsers])

  res.status(200).json("Mission Completed")
})

app.use("/api", router);

app.use('/api', (req, res) => {
  res.status(404).json(responseError({
    status: 404,
    message: "Route not found"
  }))
});

app.use('*', (req, res) => {
  res.status(404).json(responseError({
    status: 404,
    message: "Not route api"
  }))
});

export default app