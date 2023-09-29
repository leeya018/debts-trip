import React from "react"
import Button from "."

export default function StandardButton({
  children,
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
  className = "",
  disabled = false,
}) {
  return (
    <Button
      className={`px-4 py-4  border-2 b-white
       rounded-md 
          ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
    >
      {...children}
    </Button>
  )
}
