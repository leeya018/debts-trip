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
    const userId = req.userId

    if (!userId) {
      return res.status(400).send({ error: "user ID are required" })
    }
    const user = await User.findOne({ userId })
    res.status(200).send(user.name)
  } catch (error) {
    console.error("Error fetching sticks:", error)
    res.status(500).send({ error: "Internal server error" })
  }
})

export default handler
