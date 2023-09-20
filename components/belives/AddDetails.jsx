import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import logo from "images/logo.png"
import FlickerText from "./FlickerText"
let inter
const AddDetails = observer(() => {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff") // default background color
  const [contrast, setContrast] = useState(100) // default contrast
  const [brightness, setBrightness] = useState(20) // default brightness
  const [size, setSize] = useState(20) // starting size (percentage)
  const audioRef = useRef(null)

  const playSound = () => {
    audioRef.current.play()
  }
  const handleContrastChange = (event) => {
    setContrast(event.target.value)
  }

  const handleBackgroundColorChange = (event) => {
    setBackgroundColor(event.target.value)
  }
  useEffect(() => {
    clearInterval(inter)
  }, [])

  const resetVals = () => {
    setContrast(100)
    setBrightness(20)
    setSize(20)
  }
  const start = () => {
    let i = 0
    inter = setInterval(() => {
      i++
      setContrast((prev) => prev + 10)
      setBrightness((prev) => prev + 10)
      setSize((prev) => prev + 10)
      if (i === 9) {
        clearInterval(inter)
        setTimeout(() => {
          resetVals()
        }, 4000)
      }
    }, 200)
  }
  return (
    <div className="App" style={{ backgroundColor }}>
      <button onClick={start}>start</button>
      <button onClick={playSound}>Play Sound</button>
      <audio ref={audioRef} src="/path_to_your_audio_file.mp3" preload="auto" />
      <input
        type="color"
        value={backgroundColor}
        onChange={handleBackgroundColorChange}
      />
      <input
        type="range"
        min="25"
        max="150"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />

      <input
        type="range"
        min="0"
        max="200"
        value={contrast}
        onChange={handleContrastChange}
      />
      <input
        type="range"
        min="0"
        max="200"
        value={brightness}
        onChange={(e) => setBrightness(e.target.value)}
      />
      <FlickerText />

      <img
        src={logo.src}
        alt="Your Description"
        style={{
          filter: `contrast(${contrast}%) brightness(${brightness}%)`,
          width: `${size}%`,
          transition: "width 0.1s",
        }}
      />
    </div>
  )
})
export default AddDetails
