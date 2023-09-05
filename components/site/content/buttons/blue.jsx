import React from "react"

export default function BlueButton({ children, onClick, className }) {
  return (
    <div
      onClick={onClick}
      className={`px-2 py-1 border-[1px] border-blueL h-10
      text-blueL hover:bg-blueD hover:text-white rounded-lg
       flex justify-center items-center cursor-pointer ${className}`}
    >
      {children}
    </div>
  )
}
