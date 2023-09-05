import cors from "cors"
import dbConnect from "lib/dbConnect"
import User from "models/User"
import nc from "next-connect"
import { corsMiddleware, withAuthentication } from "../validate"

dbConnect()

const handler = nc({ attachParams: true })
handler.use(corsMiddleware)
handler.use(withAuthentication)

handler.get(async (req, res) => {
  try {
    const { categoryId } = req.query
    const userId = req.userId

    if (!userId || !categoryId) {
      return res
        .status(400)
        .send({ error: "Both user ID and category id are required" })
    }

    const user = await User.findOne({ userId })

    if (!user) {
      return res.status(404).send({ error: "User not found" })
    }

    // Find the category within the user's categories
    console.log(
      categoryId,
      user.categories.map((cat) => cat._id)
    )

    const category = user.categories.find(
      (cat) => cat._id.toString() === categoryId
    )

    if (!category) {
      return res.status(404).send({ error: "Category not found" })
    }
    console.log("category.words", category.words)
    res.status(200).send(category.words)
  } catch (error) {
    console.error("Error fetching words:", error)
    res.status(500).send({ error: "Internal server error" })
  }
})

export default handler
