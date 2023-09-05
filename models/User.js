import mongoose from "mongoose"

const wordSchema = new mongoose.Schema({
  count: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  translation: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
})

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  words: {
    type: [wordSchema],
    required: true,
  },
})
const userSchema = new mongoose.Schema({
  userId: String,
  name: String,
  categories: [categorySchema],
})

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User
