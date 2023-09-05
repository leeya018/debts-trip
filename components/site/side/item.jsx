import React, { useState } from "react"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import { sideStore } from "mobx/sideStore"

const Item = ({ text = "Get Better", onClick, name }) => {
  // console.log(sideStore.activeTab, name)

  return (
    <li
      onClick={onClick}
      className={`p-3 w-[90%] text-whiteGray flex gap-2
      cursor-pointer 
      hover:text-blueD ${sideStore.activeTab == name ? "bg-blueD" : ""}`}
    >
      <PlayCircleIcon /> {text}
    </li>
  )
}

export default Item
