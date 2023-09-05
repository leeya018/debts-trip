import cors from "cors"
import dbConnect from "lib/dbConnect"
import User from "models/User"
import nc from "next-connect"
import { corsMiddleware, withAuthentication } from "../validate"

dbConnect()

const handler = nc({ attachParams: true })
handler.use(corsMiddleware)
handler.use(withAuthentication)

const checkFit = (stick) => {
  const daysSpaces = {
    0: 0,
    1: 1,
    3: 3,
    7: 7,
    12: 12,
  }

  const today = new Date()
  const daysSpacesArr = Object.keys(daysSpaces).values()
  for (const dayNum of daysSpacesArr) {
    const d = new Date(today.setDate(today.getDate() - dayNum))
    const start = d.setHours(0, 0, 0, 0)
    const end = d.setHours(23, 59, 59, 999)
    const stickDate = new Date(stick.createdAt)
    if (stickDate > start && stickDate < end) {
      return true
    }
  }
  return false
}

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

    const filterdSticks = category.sticks.filter((st) => {
      return checkFit(st)
    })
    res.status(200).send(filterdSticks)
  } catch (error) {
    console.error("Error fetching sticks:", error)
    res.status(500).send({ error: "Internal server error" })
  }
})

export default handler
