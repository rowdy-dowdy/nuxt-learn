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

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

import userRoutes from './router/user'

app.use("/api", userRoutes);


export default app