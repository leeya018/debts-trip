import React from "react"

export default function Button({
  children,
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  className = "",
}) {
  return (
    <div
      className={`cursor-pointer 
      flex justify-center items-center ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
