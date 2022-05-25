import express from 'express'
import mongoose from 'mongoose'
const app = express()

mongoose
  .connect(process.env.db_url)
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });

import './model/task'
import './model/board'

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

import userRoutes from './router/user'
import boardRoutes from './router/board'

app.use("/api/users", userRoutes);
app.use("/api/boards", boardRoutes);


export default app