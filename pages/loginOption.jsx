import React from "react"
import Title from "ui/Title"
import { useRouter } from "next/router"
import StandardButton from "ui/button/standard"

export default function loginOption() {
  const router = useRouter()

  return (
    <div className="h-[100vh] w-screen flex flex-col justify-center items-center">
      <div className="w-[80%] flex flex-col justify-center items-center   gap-2">
        <Title className={"text-xl"}>Choose Login method:</Title>
        <StandardButton className="w-[60%]">Google</StandardButton>
        <StandardButton
          onClick={() => router.push(`/login`)}
          className="w-[60%]"
        >
          Email & Password
        </StandardButton>
      </div>
    </div>
  )
}
