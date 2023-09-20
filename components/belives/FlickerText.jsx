import React from "react"

function FlickerText() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <span
        className="text-9xl font-bold text-red-400 shadow-2xl p-10 bg-gray-800 rounded-md animate-flicker duration-10000"
        style={{
          animation: "showHide 3s linear 0s 3 forwards",
        }}
      >
        Flicker Text
      </span>
    </div>
  )
}

export default FlickerText
