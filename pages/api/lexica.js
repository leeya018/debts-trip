import axios from "axios"
import nc from "next-connect"

const handler = nc({ attachParams: true })

handler.post(async (req, res) => {
  const { searchTxt} = req.body
  let data = JSON.stringify({
    text: searchTxt,
    searchMode: "images",
    source: "search",
    cursor: 200,
    model: "lexica-aperture-v2",
  })

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: process.env.IMAGES_SERVER_URL,
    headers: {
      "Content-Type": "application/json",
      Cookie:
        `${process.env.IMAGES_SERVER_COOKIE}; __Secure-next-auth.callback-url=https%3A%2F%2Flexica.art`,
    },
    data: data,
  }

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data))
      return res.status(200).json(response.data)
    })
    .catch((error) => {
      console.log(error)
      return res.status(500).json(error.message)
    })
})

export default handler
