import mongoose from "mongoose"
const { Schema } = mongoose;
import Task from './task'

let boardSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  tasks: [{ type : mongoose.Schema.Types.ObjectId, ref: Task }],
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  }
})

let Board = mongoose.model("Board", boardSchema)

export default Board