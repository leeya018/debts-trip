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
  const router = useRouter()
  const { setLoginUser, setToken, getToken } = userStore

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
      className="absolute bg-white z-50 top-0 left-0 right-0 
      w-full
     flex  border-2 justify-between items-center "
    >
      <NavItem className="text-red-500 ml-2" onClick={logout}>
        Logout
      </NavItem>
      {getProfileImage()}
    </div>
  )
})

export default Navbar
