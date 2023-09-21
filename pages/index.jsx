import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import AddDetails from "components/belives/AddDetails"
import AffirmationFind from "components/belives/AffirmationFind"
import axios from "axios"
import ColoredText from "components/belives/ColoredText"
import Sound from "components/belives/Sound"
import { userStore } from "mobx/userStore"
import Image from "next/image"
import Person2Icon from "@mui/icons-material/Person2"

const index = observer(() => {
  const isClient = typeof window !== "undefined"
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
    <div className="h-[100vh] w-screen bg-secondary flex flex-col  px-2">
      {isClient && (
        <div>
          <div className="absolute top-0 right-0">{getProfileImage()}</div>
          {/* <div>{userStore.displayName}</div>
          <div>{userStore.uid}</div>
          <div>{userStore.token}</div> */}
        </div>
      )}
      {/* AddDetails */}

      {/* <AffirmationFind /> */}
    </div>
  )
})

export default index
