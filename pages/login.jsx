import React from "react"
import { useState } from "react"
import Title from "ui/Title"
import StandardButton from "ui/button/standard"
import LessInput from "ui/input/less"
import Link from "next/link"

export default function login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = () => {}

  return (
    <div className="h-[100vh] w-screen flex flex-col justify-center items-center">
      <div className="w-[80%] flex flex-col justify-center items-center   gap-2">
        <Title className={"text-xl"}>Login</Title>
        <LessInput
          value={email}
          placeholder="add email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <LessInput
          value={password}
          placeholder="add password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <StandardButton onClick={login} className="w-[60%]">
          Login
        </StandardButton>
        <div className="mt-5">
          Dont have an account?
          <Link href="/signup" className="text-lg underline text-blue-500">
            <span className="text-blue-500  ">to signup</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
