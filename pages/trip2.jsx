import React from "react"

import { useRouter } from "next/router"

import { tripStore } from "mobx/tripStore"
import Image from "next/image"

import { observer } from "mobx-react-lite"
import Title from "ui/Title"
import StandardButton from "ui/button/standard"

const famiesStatus = {
  single: "single",
  couple: "couple",
  family: "family",
  group: "group",
}

const index = observer(({}) => {
  const router = useRouter()

  return (
    <div className="h-[100vh] w-screen bg-secondary flex flex-col items-center">
      <div className="w-[50%] flex flex-col">
        <Title>chooese pepole</Title>
        <div className="grid grid-rows-2 grid-cols-2 gap-2 mb-5">
          <Image
            className={`w-full h-full border-2 border-black cursor-pointer ${
              tripStore.family === famiesStatus.single
                ? "border-2 border-red"
                : ""
            }`}
            src={"/images/single.jpg"}
            alt="no data"
            height={50}
            width={50}
            onClick={() => tripStore.setFamily(famiesStatus.single)}
          />
          <Image
            className={`w-full h-full border-2 border-black cursor-pointer ${
              tripStore.family === famiesStatus.couple
                ? "border-2 border-red"
                : ""
            }`}
            src={"/images/couple.jpg"}
            alt="restaurant"
            height={50}
            width={50}
            onClick={() => tripStore.setFamily(famiesStatus.couple)}
          />
          <Image
            className={`w-full h-full border-2 border-black cursor-pointer ${
              tripStore.family === famiesStatus.family
                ? "border-2 border-red"
                : ""
            }`}
            src={"/images/family.jpg"}
            alt="music"
            height={50}
            width={50}
            onClick={() => tripStore.setFamily(famiesStatus.family)}
          />
          <Image
            className={`w-full h-full border-2 border-black cursor-pointer ${
              tripStore.family === famiesStatus.group
                ? "border-2 border-red"
                : ""
            }`}
            src={"/images/group.jpg"}
            alt="hotel"
            height={50}
            width={50}
            onClick={() => tripStore.setFamily(famiesStatus.group)}
          />
        </div>
        <StandardButton
          className="bg-blueL"
          variant="primary"
          onClick={() => router.push("waiting")}
        >
          Set people
        </StandardButton>{" "}
      </div>
    </div>
  )
})
export default index
