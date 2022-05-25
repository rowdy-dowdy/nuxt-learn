import mongoose from "mongoose"
const { Schema } = mongoose;

let taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: Object,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  }
})

let Task = mongoose.model("Task", taskSchema)

export default Task