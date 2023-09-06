import React from "react"
import { useState } from "react"
import Title from "ui/Title"
import StandardButton from "ui/button/standard"
import LessInput from "ui/input/less"
import Link from "next/link"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { modals } from "lib/util"
import { modalStore } from "mobx/modalStore"

export default function signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cofirmedPassword, setCofirmedPassword] = useState("")

  const signup = () => {
    if (!(password === cofirmedPassword && isPassValid())) return
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        modalStore.openModal(modals.signup)

        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorMessage)
        // ..
      })
  }

  const isPassValid = () => {
    return password.length >= 6
  }
  const getStyleToConfirmed = () => {
    if (cofirmedPassword === "") return ""
    if (password === cofirmedPassword && isPassValid()) return "ring-green"
    return "ring-red"
  }

  return (
    <div className="h-[100vh] w-screen flex flex-col justify-center items-center">
      <div className="w-[80%] flex flex-col justify-center items-center   gap-2">
        <Title className={"text-xl"}>Signup</Title>
        <LessInput
          value={email}
          placeholder="add email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <LessInput
          className={isPassValid() ? "ring-green" : ""}
          value={password}
          placeholder="add password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <LessInput
          className={getStyleToConfirmed()}
          // className={isPassMatch() ? "ring-green" : "ring-red"}
          value={cofirmedPassword}
          placeholder="repeat password"
          onChange={(e) => setCofirmedPassword(e.target.value)}
        />
        <StandardButton
          onClick={signup}
          className={
            !(password === cofirmedPassword && isPassValid())
              ? "bg-disabled w-[60%]"
              : "w-[60%]"
          }
        >
          Signup
        </StandardButton>
        <div className="mt-5">
          Allrady have an account?
          <Link href="/login" className="text-lg underline text-blue-500">
            <span className="text-blue-500 ">to login</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
