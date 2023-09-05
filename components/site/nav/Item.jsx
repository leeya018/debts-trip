import { navStore } from "mobx/navStore"
import React from "react"

export default function Item({ text, onClick, name,isActive = true }) {
  const { activeNavItem, setactiveNavItem } = navStore
  const handleClick = () => {
    if(!isActive) return
     onClick()
  }
  return (
    <div
      onClick={handleClick}
      className={`px-10 py-2 flex justify-center items-center 
     font-bold  ${!isActive ? 'text-grayb1':'cursor-pointer'} hover:${isActive ?'text-blueD':''} ${
      activeNavItem == name ? "text-blueD" : ""
     }`}
    >
      {text}
    </div>
  ) 
}
