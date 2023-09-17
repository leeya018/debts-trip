import React from "react"
import { PiArchiveDuotone } from "react-icons/pi"

export default function ArchivePanel() {
  return (
    <div className="w-full flex items-center justify-between py-1 ">
      <div className="flex items-center gap-7 pl-4 ">
        <PiArchiveDuotone fill={"bg-whats_gray_i"} className=" text-white" />
        <div className="cursor-pointer font-medium"> Archived</div>
      </div>
      <div className="text-whats_blue">1</div>
    </div>
  )
}
