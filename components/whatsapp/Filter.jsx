import React from "react"
import { GoSearch } from "react-icons/go"

export default function Filter() {
  return (
    <div className="w-full flex  items-center relative p-2">
      <input
        placeholder="search"
        type="text"
        className="w-full  rounded-md bg-whats_gray_b text-whats_gray_t  "
      />
      <GoSearch className="w-6 h-6 absolute left-3 " />
    </div>
  )
}
