import React from "react"

import { useRouter } from "next/router"

import { tripStore } from "mobx/tripStore"
import Image from "next/image"

import { observer } from "mobx-react-lite"
import Title from "ui/Title"
import StandardButton from "ui/button/standard"

const locations = {
  hotel: "hotel",
  music: "music",
  restaurant: "restaurant",
  beach: "beach",
}

const index = observer(({}) => {
  const router = useRouter()

  return (
    <div className="h-[100vh] w-screen bg-secondary flex flex-col items-center">
      <div className="w-[50%] flex flex-col">
        <Title>chooese location</Title>
        <div className="grid grid-rows-2 grid-cols-2 gap-2 mb-5">
          <Image
            className={`w-full h-full border-2 border-black cursor-pointer ${
              tripStore.location === locations.beach
                ? "border-2 border-red"
                : ""
            }`}
            src={"/images/beach.jpg"}
            alt="no data"
            height={50}
            width={50}
            onClick={() => tripStore.setLocation(locations.beach)}
          />
          <Image
            className={`w-full h-full border-2 border-black cursor-pointer ${
              tripStore.location === locations.restaurant
                ? "border-2 border-red"
                : ""
            }`}
            src={"/images/restaurant.jpg"}
            alt="restaurant"
            height={50}
            width={50}
            onClick={() => tripStore.setLocation(locations.restaurant)}
          />
          <Image
            className={`w-full h-full border-2 border-black cursor-pointer ${
              tripStore.location === locations.music
                ? "border-2 border-red"
                : ""
            }`}
            src={"/images/music.jpg"}
            alt="music"
            height={50}
            width={50}
            onClick={() => tripStore.setLocation(locations.music)}
          />
          <Image
            className={`w-full h-full border-2 border-black cursor-pointer ${
              tripStore.location === locations.hotel
                ? "border-2 border-red"
                : ""
            }`}
            src={"/images/hotel.jpg"}
            alt="hotel"
            height={50}
            width={50}
            onClick={() => tripStore.setLocation(locations.hotel)}
          />
        </div>
        <StandardButton
          className="bg-blueL"
          variant="primary"
          onClick={() => router.push("trip2")}
        >
          Set Location
        </StandardButton>{" "}
      </div>
    </div>
  )
})
export default index
