import React from "react"

export default function Button({
  children,
  onClick = () => {},
  className = "",
}) {
  return (
    <div
      className={`cursor-pointer 
      flex justify-center items-center ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
