import React from "react"

export default function LessInput({
  onKeyDown = () => {},
  placeholder = "",
  className = "",
  onChange = () => {},
  value,
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={`rounded-md  mb-2
  h-10 ring 
  focus:outline-none  ${className}`}
    />
  )
}
