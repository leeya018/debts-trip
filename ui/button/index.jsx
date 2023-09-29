import React from "react"

export default function Button({
  children,
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  className = "",
  disabled = false,
}) {
  return (
    <div
      className={`cursor-pointer 
      flex justify-center items-center ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </div>
  )
}
