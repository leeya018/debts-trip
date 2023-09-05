import cors from "cors"
import dbConnect from "lib/dbConnect"
import User from "models/User"

import nc from "next-connect"
import { corsMiddleware, withAuthentication } from "../validate"
dbConnect()
const handler = nc({ attachParams: true })
handler.use(corsMiddleware)
handler.use(withAuthentication)

handler.delete(async (req, res) => {
  try {
    const { categoryId } = req.query // Assuming you're passing user ID, category ID, and stick ID as URL parameters
    const userId = req.userId
    const wordId = req.query.id

    if (!userId || !categoryId || !wordId) {
      return res
        .status(400)
        .send({ error: "User ID, category ID, and stick ID are required" })
    }

    const user = await User.findOne({ userId })

    if (!user) {
      return res.status(404).send({ error: "User not found" })
    }

    const categoryIndex = user.categories.findIndex(
      (cat) => cat._id.toString() === categoryId
    )

    if (categoryIndex === -1) {
      return res.status(404).send({ error: "Category not found" })
    }

    // Find the stick and remove it from the category
    const wordInd = user.categories[categoryIndex].words.findIndex(
      (word) => word._id.toString() === wordId
    )

    if (wordInd === -1) {
      return res.status(404).send({ error: "Stick not found" })
    }

    user.categories[categoryIndex].words.splice(wordInd, 1)

    await user.save()

    res.status(200).send(wordId)
  } catch (error) {
    console.error("Error deleting stick:", error)
    res.status(500).send({ error: "Internal server error" })
  }
})

handler.put(async (req, res) => {
  try {
    const { categoryId } = req.query // Adjust based on how you want to identify category
    const wordId = req.query.id // Adjust based on how you want to identify category
    const { word,plusCount } = req.body
    const userId = req.userId

    if (!userId || !categoryId || !wordId) {
      return res.status(400).send({ error: "all params are required" })
    }

    const user = await User.findOne({ userId })

    if (!user) {
      return res.status(404).send({ error: "User not found" })
    }

    // Find the category within the user's categories
    const category = user.categories.find(
      (cat) => cat._id.toString() === categoryId
    )

    if (!category) {
      return res.status(404).send({ error: "Category not found" })
    }

    // Add a new stick to the category
    let updatedWord = "for now"
    category.words.map((st) => {
      if (st._id.toString() === wordId) {
        st.text = word.text
        st.translation = word.translation
        st.createdAt = new Date()
        st.count+=plusCount
        updatedWord = st
      }
      return st
    })

    await user.save()

    res.status(200).send(updatedWord)
  } catch (error) {
    console.error("Error adding stick:", error)
    res.status(500).send({ error: "Internal server error" })
  }
})

export default handler
