import React, { useEffect } from "react"
import { getPath, isSticks, navNames, parseJwt } from "lib/util"
import { userStore } from "mobx/userStore"
import { observer } from "mobx-react-lite"
import Image from "next/image"
import useLocalStorage from "hooks/useLocalStorage"
import { useState } from "react"
import Button from "ui/button"
import { googleLogout } from "@react-oauth/google"
import { useRouter } from "next/router"
import NavItem from "ui/NavItem"
import logo from "images/logo.png"
import { stickStore } from "mobx/stickStore"
import { navStore } from "mobx/navStore"

const Navbar = observer(({ categoryId }) => {
  const [picture, setPicture] = useLocalStorage("picture", "")
  const [name, setName] = useLocalStorage("name", "")
  const [data, setData] = useState(null)
  const [profile, setProfile] = useState(null)
  const { isTitleInputOpen, setIsTitleInputOpen } = stickStore
  const router = useRouter()
  const { setSelectedName } = navStore
  const [isPathStick, setIsStickPath] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isStickPath = isSticks()
      setIsStickPath(isStickPath)
    }
  }, [])

  useEffect(() => {
    if (name && picture) {
      setData({ name, picture })
    }
  }, [name, picture])
  
  const logout = () => {
    googleLogout()
    setPicture("")
    setName("")
    setProfile(null)
    router.push(`/`)
  }

  const isSticks = () => {
    return window.location.pathname.includes("/categories/")
  }

  return (
    <div
      className="sticky bg-white z-50 top-0 left-0 right-0 
      w-[100vw]
     flex  h-30 border-2 justify-end items-center  gap-8"
    >
      <Image
        className="shadow ml-4 h-auto mr-auto"
        src={logo.src}
        alt="no data"
        height={60}
        width={60}
      />
      <NavItem className="text-red-500" onClick={logout}>
        Logout
      </NavItem>
      {!isTitleInputOpen && (
        <NavItem
          name={navNames.download}
          onClick={() => {
            setSelectedName(navNames.download)
            setIsTitleInputOpen(true)
          }}
        >
          Download list
        </NavItem>
      )}
      {isPathStick && (
        // {
        <NavItem
          name={navNames.practice}
          onClick={() => {
            setSelectedName(navNames.practice)
            router.push(`/daily/${categoryId}`)
          }}
        >
          Go to practice
        </NavItem>
      )}
      <NavItem
        name={navNames.categories}
        onClick={() => {
          setSelectedName(navNames.categories)
          router.push(`/categories`)
        }}
      >
        Categories
      </NavItem>
      <div className="flex items-center gap-2 ">
        <NavItem>{data?.name}</NavItem>
        <div>
          <Image
            className="rounded-full shadow mr-4 h-auto align-middle"
            src={data?.picture}
            alt="no data"
            height={60}
            width={60}
          />
        </div>
      </div>
    </div>
  )
})

export default Navbar
