import React, { useEffect } from "react"

import { useState } from "react"
import Title from "ui/Title"
import StandardButton from "ui/button/standard"
import LessInput from "ui/input/less"
import Link from "next/link"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"
import { useRouter } from "next/router"
import { parseJwt } from "lib/util"
import { userStore } from "mobx/userStore"
import { debtStore } from "mobx/debtStore"

export default function login() {
  const router = useRouter()
  const { setLoginUser, setToken, getToken } = userStore

  const [email, setEmail] = useState("lee1@yahav.com")
  const [password, setPassword] = useState("123456")

  useEffect(() => {
    const newToken = getToken()
    if (newToken) {
      setToken(newToken)
      const user = parseJwt(newToken)
      const newUser = {
        photoURL: user.picture,
        displayName: user.name,
        uid: user.user_id,
      }
      setLoginUser(newUser)
      console.log({ user })
    }
  }, [getToken, setLoginUser])

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user

        console.log(user)
        setToken(user.accessToken)
        console.log(user.photoURL)
        console.log(user.displayName)
        console.log(user.uid)
        setLoginUser(user)
        router.push("/myList")
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
  }

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
