import express from 'express'
const router = express.Router();
import User from '../model/user'

router.get('/users', async (req, res) => {
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

router.post('/users/create', async (req, res) => {
  try {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    await user.save()

    res.status(200).json({
      user
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
})

export default router