import React from "react"

export default function LessInput({
  onKeyDown = () => {},
  placeholder = "",
  className = "",
  onBlur = () => {},
  onFocus = () => {},
  onChange = () => {},
  value,
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onFocus={onFocus}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      className={`rounded-md  mb-2
  h-10 ring 
  focus:outline-none  ${className}`}
    />
  )
}
