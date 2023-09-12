import React, { useEffect } from "react"

import { useRouter } from "next/router"

import { tripStore } from "mobx/tripStore"
import Image from "next/image"

import { observer } from "mobx-react-lite"
import Title from "ui/Title"
import { CircularProgress } from "@mui/material"
import axios from "axios"

const index = observer(({}) => {
  const router = useRouter()
  useEffect(() => {
    // askChat()
  }, [])
  const askChat = async () => {
    let data = JSON.stringify({
      model: "text-davinci-003",
      prompt: `I want to arrang a trip to a place which have amazing ${"restaurant"}  \n\nfor a ${"couple"} \n\nnad with a budget of ${5000} dollars. \n\nplease give me the details for the trip`,
      // prompt: `I want to arrang a trip to a place which have amazing ${tripStore.location}  \n\nfor a ${tripStore.family} \n\nnad with a budget of ${tripStore.budget} dollars. \n\nplease give me the details for the trip`,
      max_tokens: 1000,
    })

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.openai.com/v1/completions",
      headers: {
        Authorization: process.env.NEXT_PUBLIC_CHAT_GPT_TOKEN,
        "Content-Type": "application/json",
      },
      data: data,
    }

    axios
      .request(config)
      .then((res) => {
        console.log(res.data)
        console.log(res.data.choices[0].text.trim())
        tripStore.setResult(res.data.choices[0].text.trim())
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div className="h-[100vh] w-screen bg-secondary flex flex-col items-center justify-center">
      <div className="w-96">
        <Image
          className={`w-full h-full border-2 border-black cursor-pointer`}
          src={"/images/chick.gif"}
          alt="hotel"
          height={50}
          width={50}
          onClick={() => tripStore.setFamily(famiesStatus.group)}
        />
        <Title>
          Wait ... <CircularProgress />
        </Title>
      </div>
      <button onClick={askChat}>askChat</button>
    </div>
  )
})
export default index
