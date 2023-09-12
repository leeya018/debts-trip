import React, { useEffect } from "react"

import { useRouter } from "next/router"

import { tripStore } from "mobx/tripStore"
import Image from "next/image"

import { observer } from "mobx-react-lite"
import Title from "ui/Title"
import { CircularProgress } from "@mui/material"
import axios from "axios"

const OPENAI_API_URL =
  "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions"

const index = observer(({}) => {
  const router = useRouter()
  useEffect(() => {
    // askChat()
  }, [])
  const askChat = async () => {
    try {
      const response = await axios.post(
        OPENAI_API_URL,
        {
          prompt: "what is the coldest place on earth?",
          max_tokens: 1000,
        },
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_CHAT_GPT_TOKEN,
            "Content-Type": "application/json",
          },
        }
      )

      const answer = response.data.choices[0].text.trim()
      console.log(answer)
    } catch (error) {
      console.error("Error calling OpenAI API:", error.response.data)
    }
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
