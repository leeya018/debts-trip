import React from "react"

function Sound() {
  const playSound = () => {
    const audio = new Audio("/path_to_your_audio_file.mp3")
    audio.play()
  }

  return (
    <div>
      <button onClick={playSound}>Play Sound</button>
    </div>
  )
}

export default Sound
