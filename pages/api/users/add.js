import cors from "cors"
import dbConnect from "lib/dbConnect"
import User from "models/User"
import nc from "next-connect"
import { corsMiddleware, withAuthentication, withCors } from "../validate"

dbConnect()

const handler = nc({ attachParams: true })
handler.use(corsMiddleware)
handler.use(withAuthentication)

handler.post(async (req, res) => {
  try {
    console.log("=== ADD USER ===")

    const { name } = req.body
    const userId = req.userId

    if (!name || !userId) {
      return res.status(400).send({ error: "Name and userId are required" })
    }

    // find user
    const user = await User.findOne({ userId })
    console.log({ user })

    if (user) {
      return res.status(200).send({ message: "user is allready registered" })
    }
    // Create a new user
    const newUser = new User({
      userId,
      name: name,
      categories: [],
    })

    await newUser.save()

    res.status(201).send({ message: "User added successfully", user: newUser })
  } catch (error) {
    console.error("Error adding user:", error)
    res.status(500).send({ error: "Internal server error" })
  }
})

export default handler
