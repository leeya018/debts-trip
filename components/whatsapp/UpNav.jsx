import React from "react"
import { HiOutlineCamera } from "react-icons/hi"
import { BiSolidEdit } from "react-icons/bi"

export default function UpNav() {
  return (
    <div className="w-full text-whats_blue h-10 flex justify-between items-center ">
      <div className="text-lg">Edit</div>
      <div className="flex justify-around items-center gap-5">
        <HiOutlineCamera className="w-6 h-6" />
        <BiSolidEdit className="w-6 h-6" />
      </div>
    </div>
  )
}
