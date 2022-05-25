import express from 'express'
const router = express.Router();
import Board from '../model/board'

const getBoards = async (req, res) => {
  try {
    let boards = await Board.find().populate('tasks')

    res.status(200).json({
      boards
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
}

const createBoard = async (req, res) => {
  try {
    let board = new Board({
      title: req.body.title,
      tasks: []
    })

    await board.save()

    res.status(200).json({
      board
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
}

const createTask = async (req, res) => {
  try {
    var board = await Board.findOneAndUpdate({
      _id: req.params.id
    }, {
      $push: { tasks: {
        "title": req.body.title,
        "description": req.body.description
      }}
    },{
      new: true
    })

    res.status(200).json({
      board
    })
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
}

router.get('/', getBoards)
router.post('/create', createBoard)
router.get('/boards/:id/tasks/create', createTask)

export default router