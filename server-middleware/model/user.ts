import mongoose from "mongoose"
const { Schema } = mongoose;

let userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: Object,
    required: true
  },
  password: {
    type: String,
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

let User = mongoose.model("Music", userSchema)

export default User