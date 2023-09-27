import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import Image from "next/image"
import useLocalStorage from "hooks/useLocalStorage"
import { useState } from "react"
import { googleLogout } from "@react-oauth/google"
import { useRouter } from "next/router"
import NavItem from "ui/NavItem"
import { signOut } from "firebase/auth"
import { userStore } from "mobx/userStore"
import { debtStore } from "mobx/debtStore"
import { categoryStore } from "mobx/categoryStore"
import { PATH_NAMES, parseJwt } from "lib/util"
import { auth } from "../../../firebase"
import Person2Icon from "@mui/icons-material/Person2"

const Navbar = observer(() => {
  const isClient = typeof window !== "undefined"
  const router = useRouter()
  const { setLoginUser, setToken } = userStore

  useEffect(() => {
    if (userStore.token) {
      setToken(userStore.token)
      const user = parseJwt(userStore.token)
      const newUser = {
        photoURL: user.picture,
        displayName: user.name,
        uid: user.user_id,
      }
      setLoginUser(newUser)
      console.log({ user })
    }
  }, [userStore.token, setLoginUser])

  const logout = () => {
    signOut(auth)
    setToken("")
    userStore.resetLoginUser()
    categoryStore.setSelectedCategory(null)
    debtStore.resetUserStore()
    router.push(PATH_NAMES.loginOption)
  }
  const getProfileImage = () => {
    if (userStore?.photoURL) {
      return (
        <Image
          className="mr-2 rounded-full"
          src={userStore?.photoURL ?? ""}
          alt="no data"
          height={50}
          width={50}
        />
      )
    } else {
      return <Person2Icon className="ml-auto cursor-pointer" />
    }
  }
  return (
    <div
      className=" bg-white z-50 top-0 left-0 right-0 
      w-full
     flex  justify-between items-center "
    >
      <NavItem className="text-red-500 ml-2" onClick={logout}>
        Logout
      </NavItem>
      <div className="flex justify-center items-center gap-2 ">
        {isClient && <div>{userStore.displayName}</div>}
        {getProfileImage()}
      </div>
    </div>
  )
})

export default Navbar
