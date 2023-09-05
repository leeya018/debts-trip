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
  console.log("add category")
  try {
    const userId = req.userId

    const { categoryName } = req.body
    console.log(userId)

    if (!categoryName) {
      return res.status(400).send({ error: "Category name is required" })
    }
    console.log({ userId })

    const user = await User.findOne({ userId })
    console.log({ user })

    if (!user) {
      return res.status(404).send({ error: "User in not found" })
    }

    // Add a new category
    const newCategory = {
      name: categoryName,
      createdAt: new Date(),
      words: [],
    }
    user.categories.push(newCategory)

    await user.save()
    const savedCategory = user.categories.find(
      (cat) => cat.name === newCategory.name
    )
    res.status(200).send(savedCategory)
  } catch (error) {
    console.error("Error adding category:", error)
    res.status(500).send({ error: "Internal server error" })
  }
})

export default handler
