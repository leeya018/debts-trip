import React, { useState } from "react"

import Navbar from "components/site/nav"
import Footer from "components/Footer"
import StandardButton from "ui/button/standard"
import { useRouter } from "next/router"
import Title from "ui/Title"

export default function createGroup() {
  const router = useRouter()
  const [copyTxt, setCopyTxt] = useState("to copy")

  const copyTxtFunc = () => {
    navigator.clipboard.writeText("T$#@P$trTDSR")
    setCopyTxt("coppied")
  }

  return (
    <div className="h-[100vh] w-screen flex items-center justify-center flex-col  ">
      <div className="w-[80%] flex flex-col items-center ">
        <Navbar />
        <Title className="text-xg">This is your group Id:</Title>
        <Title className="text-lg">
          Send this Id to the people you want them to Connect with your group
        </Title>

        <div className="flex gap-1">
          <Title className="text-2xl flex-3">T$#@P$trTDSR</Title>
          <div
            className="flex-1 cursor-pointer focus:bg-blueL"
            onClick={copyTxtFunc}
          >
            {" "}
            copy
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
