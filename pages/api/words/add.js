import cors from "cors"
import dbConnect from "lib/dbConnect"
import User from "models/User"
import nc from "next-connect"
import { corsMiddleware, withAuthentication } from "../validate"

dbConnect()

const handler = nc({ attachParams: true })
handler.use(corsMiddleware)
handler.use(withAuthentication)

handler.post(async (req, res) => {
  try {
    const { categoryId } = req.query // Adjust based on how you want to identify category
    const userId = req.userId
    const { word } = req.body

    console.log(categoryId, word)
    if (!word.text || !word.translation) {
      return res.status(400).send({ error: "all fields in word are required" })
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

    const { text, translation } = word
    // Add a new stick to the category
    category.words.push({
      text,
      translation,
      count:0,
      createdAt: new Date(),
    })

    await user.save()
    const savedWord = category.words.find((w) => w.text === text)

    res.status(200).send(savedWord)
  } catch (error) {
    console.error("Error adding word:", error)
    res.status(500).send({ error: "Internal server error" })
  }
})

export default handler
