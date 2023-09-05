import React from "react"

export default function PayButton({ children, onClick, className }) {
  return (
    <div
      onClick={onClick}
      className={`px-2 py-5 border-[1px]
      text-white bg-blueD hover:bg-blueL  rounded-lg
       flex justify-center items-center cursor-pointer ${className}`}
    >
      {children}
    </div>
  )
}
