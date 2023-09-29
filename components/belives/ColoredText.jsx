import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import muscle from "images/muscle.png"
import Image from "next/image"
import useSound from "hooks/useSound"
import { filterStore } from "mobx/filterStore"
let interImage

const ColoredText = observer(
  ({
    inputText = "23132123123",
    increaseLineNum = () => {},
    speed,
    lineNum,
    resetAffirmations,
  }) => {
    const [coloredText, setColoredText] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [size, setSize] = useState(10) // starting size (percentage)
    const [isShowImage, setIsShowImage] = useState(false) // starting size (percentage)
    const { sound, playSound } = useSound("/positive.wav")
    const { affirmations } = filterStore

    useEffect(() => {
      // Reset coloredText and currentIndex when inputText changes

      setColoredText([])
      setCurrentIndex(0)
    }, [inputText])
    useEffect(() => {
      console.log("start")
      return () => {
        console.log("end   " + currentIndex)
        console.log(`${affirmations.length} == ${lineNum}`)
        if (affirmations.length - 1 == lineNum) {
          resetAffirmations()
        }
      }
    }, [lineNum])

    useEffect(() => {
      const timer = setInterval(() => {
        if (currentIndex < inputText.length) {
          clearInterval(interImage)

          const newLetter = (
            <span style={{ color: "white" }}>{inputText[currentIndex]}</span>
          )
          setColoredText((prev) => [...prev, newLetter])
          setCurrentIndex((prevIndex) => prevIndex + 1)
        } else {
          clearInterval(timer)
          setIsShowImage(true)
          startIncreaseImage()
        }
      }, 70 - speed) // Change the duration based on your needs

      return () => {
        clearInterval(interImage)
        clearInterval(timer)
      }
    }, [currentIndex, inputText])

    const startIncreaseImage = () => {
      let i = 0
      interImage = setInterval(() => {
        i++
        setSize((prev) => prev + 5)
        if (i == 8) {
          playSound()
        }
        if (i === 15) {
          clearInterval(interImage)

          setTimeout(() => {
            increaseLineNum()
            setIsShowImage(false)
            setSize(20)
          }, 2500)
        }
      }, 50)
    }

    return (
      <div className="w-full h-full">
        {/* <div className="flex justify-between items-center bg-belief_blue text-white shadow-xl py-7 px-5"> */}
        <div className="flex justify-between items-center bg-belief_blue  shadow-xl py-7 px-5 relative">
          <div>
            {coloredText}
            {inputText.slice(currentIndex)}
          </div>
        </div>
        {isShowImage && (
          <img
            src={muscle.src}
            alt=" muscle"
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: `${size}%`,
              transition: "width 0.1s",
            }}
          />
        )}
      </div>
    )
  }
)
export default ColoredText
