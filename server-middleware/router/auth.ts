import express from 'express'
const router = express.Router();
import User from '../model/user'

router.post('/auth/login', async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json({
      users
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})

router.get('/auth/me', async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json({
      users
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})

export default router