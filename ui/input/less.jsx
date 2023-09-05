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
  h-10 ring hover:ring-blue-300 focus:ring-blue-400
  focus:outline-none  ${className}`}
    />
  )
}
