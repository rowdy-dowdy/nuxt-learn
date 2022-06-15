import express from 'express'
import cookieParser from 'cookie-parser'
const app = express()

app.use(cookieParser());
app.set("trust proxy")
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

import authRoutes from './router/auth'
import dataRoutes from './router/data'

app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);

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
    text: "Route not found"
  }))
});

// app.use('*', (req, res) => {
//   res.status(404).json(responseError({
//     status: 404,
//     message: "Not route api"
//   }))
// });

export default app