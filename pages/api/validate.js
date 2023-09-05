import cors from "cors"
import axios from "axios"
import { getUrl } from "lib/util"

const parseJwt = (token) => {
  var base64Url = token.split(".")[1]
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")

  // Use Buffer to decode the base64 string in Node.js
  var rawPayload = Buffer.from(base64, "base64").toString("utf8")

  var jsonPayload = decodeURIComponent(
    rawPayload
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join("")
  )

  return JSON.parse(jsonPayload)
}

const corsMiddleware = cors({
  origin: [getUrl()], // match with your client application's origin
  methods: ["GET", "POST", "PUT", "DELETE"], // specify the methods for which CORS is enabled
  allowedHeaders: ["Content-Type", "Authorization"],
})

const withAuthentication = async (req, res, next) => {
  try {
    console.log("=== VALIDATION ===")
    console.log("req.headers")
    console.log(req.headers)
    console.log(req.headers.authorization)

    const access_token = req.headers.authorization
    console.log({ access_token })
    console.log("parse")

    const user = parseJwt(access_token)
    console.log({ user })
    console.log(user.user_id)

    if (user.user_id) {
      req.userId = user.user_id
      return next()
    }
    res.status(401)
    return res.send("Unauthorized")
  } catch (err) {
    console.log(err)
    console.log(err.message)

    res.status(401)
    return res.send("Unauthorized")
  }
}

export { withAuthentication, corsMiddleware }
