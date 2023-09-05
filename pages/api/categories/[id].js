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
  console.log("remove category")
  console.log(req.params, req.query)

  try {
    const userId = req.userId

    const categoryId = req.query.id
    console.log(userId)

    if (!categoryId) {
      return res.status(400).send({ error: "Category id is required" })
    }
    console.log({ userId })

    const user = await User.findOne({ userId })
    console.log({ user })

    if (!user) {
      return res.status(404).send({ error: "User in not found" })
    }

    const categoryIndex = user.categories.findIndex(
      (cat) => cat._id.toString() === categoryId
    )

    if (categoryIndex === -1) {
      return res.status(404).send({ error: "Category not found" })
    }
    user.categories.splice(categoryIndex, 1)
    await user.save()

    res.status(200).send(categoryId)
  } catch (error) {
    console.error("Error adding category:", error)
    res.status(500).send({ error: "Internal server error" })
  }
})

handler.put(async (req, res) => {
  try {
    const categoryId = req.query.id // Adjust based on how you want to identify category
    const { name } = req.body
    const userId = req.userId
    console.log({ categoryId, name, userId })

    if (!userId || !categoryId || !name) {
      return res.status(400).send({ error: "all params are required" })
    }

    const user = await User.findOne({ userId })

    if (!user) {
      return res.status(404).send({ error: "User not found" })
    }

    let updatedCategory = "for now"
    // Find the category within the user's categories
    user.categories.map((cat) => {
      if (cat._id.toString() === categoryId) {
        cat.name = name
        updatedCategory = cat
      }
      return cat
    })

    await user.save()

    res.status(200).send(updatedCategory)
  } catch (error) {
    console.error("Error adding stick:", error)
    res.status(500).send({ error: "Internal server error" })
  }
})

export default handler
