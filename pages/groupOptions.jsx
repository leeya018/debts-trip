import React from "react"

import Navbar from "components/site/nav"
import Footer from "components/Footer"
import StandardButton from "ui/button/standard"
import { useRouter } from "next/router"
import Title from "ui/Title"

export default function groupOptions() {
  const router = useRouter()

  return (
    <div className="h-[100vh] w-screen flex justify-center flex-col items-center  ">
      <div className="w-[80%] flex flex-col justify-center items-center   gap-2">
        <Navbar />
        <Title>Choose one of the following options:</Title>

        <StandardButton
          onClick={() => router.push("/createGroup")}
          className="w-[60%]"
        >
          Create Group
        </StandardButton>
        <StandardButton
          onClick={() => router.push("/connectGroup")}
          className="w-[60%]"
        >
          Connect to Group
        </StandardButton>

        <Footer />
      </div>
    </div>
  )
}
