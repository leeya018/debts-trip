import React, { useState } from "react"

import Navbar from "components/site/nav"
import Footer from "components/Footer"
import StandardButton from "ui/button/standard"
import { useRouter } from "next/router"
import Title from "ui/Title"
import LessInput from "ui/input/less"
import { debtStore } from "mobx/debtStore"
import { userStore } from "mobx/userStore"
import { PATH_NAMES } from "lib/util"
import useLocalStorage from "hooks/useLocalStorage"

export default function connectGroup() {
  const router = useRouter()
  const [groupId, setProupId] = useState("")
  const [gid, setGid] = useLocalStorage("gid")

  const joinGroup = async () => {
    const isSuccess = await debtStore.joinGroup(userStore.uid, groupId)
    if (isSuccess) {
      setGid(groupId)
      router.push(PATH_NAMES.myList)
    }
  }
  const getStyleValidation = () => {
    if (groupId === "") return ""
    if (groupId.length === 20) return "ring-green"
    return "ring-red"
  }

  return (
    <div className="h-[100vh] w-screen flex items-center justify-center flex-col  ">
      <div className="w-[80%] flex flex-col items-center ">
        <Navbar />
        <Title className="text-xg">Enter Group Id inorder to connect:</Title>

        <LessInput
          className={getStyleValidation()}
          value={groupId}
          placeholder="Enter Group Id"
          onChange={(e) => setProupId(e.target.value)}
        />

        {groupId.length === 20 && (
          <StandardButton onClick={joinGroup} className="w-[60%]">
            Connect
          </StandardButton>
        )}
        <Footer />
      </div>
    </div>
  )
}
