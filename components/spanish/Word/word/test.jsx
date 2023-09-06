import EditIcon from "components/icons/Edit"
import { observer } from "mobx-react-lite"
import React, { useState } from "react"
import LocalHospitalIcon from "@mui/icons-material/LocalHospital"
import { categoryStore } from "mobx/categoryStore"
import { SHOWS, modals } from "lib/util"
import { modalStore } from "mobx/modalStore"
import { spanishStore } from "mobx/debtStore"
import { testStore } from "mobx/testStore"

const blue = "bg-blueL"
const red = ""
const WordTest = observer(({ word }) => {
  const [isHover, setIsHover] = useState(false)
  const [ispicked, setIspicked] = useState(false)
  const [isFliped, setisFliped] = useState(false)
  const [score, setScore] = useState(0)

  const getHover = () => {
    return (
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="cursor-pointer 
  hover:bg-white hover:duration-150
   rounded-md border-2
    border-white bg-blueL
    flex justify-center items-center
    px-4 py-4 h-[10vh] sm:px-2"
      >
        {!isHover && <div>{word.text}</div>}
        {isHover && <div>{word.translation}</div>}
      </div>
    )
  }
  const getAll = () => {
    return (
      <div
        className="cursor-pointer 
  
   rounded-md border-2
    border-white bg-blueL
    flex justify-center items-center
    px-4 py-4 h-[10vh] sm:px-2"
      >
        <div>
          {word.text} - {word.translation}
        </div>
      </div>
    )
  }
  const getPick = () => {
    return (
      <div
        onMouseDown={() => setIspicked(true)}
        onMouseUp={() => setIspicked(false)}
        className="cursor-pointer 
  active:bg-white active:duration-150 active:
   rounded-md border-2
    border-white bg-blueL
    flex justify-center items-center
    px-4 py-4 h-[10vh] sm:px-2"
      >
        {/* {ispicked ? "true": "false"} */}
        {!ispicked && <div>{word.text}</div>}
        {ispicked && <div>{word.translation}</div>}
      </div>
    )
  }
  const getFlip = () => {
    return (
      <div
        onClick={() => setisFliped((prev) => !prev)}
        className={`cursor-pointer 
   active:duration-150 active:
   rounded-md border-2
    border-white ${isFliped ? "bg-white" : "bg-blueL"}
    flex justify-center items-center
    px-4 py-4 h-[10vh] sm:px-2`}
      >
        {!isFliped && <div>{word.text}</div>}
        {isFliped && <div>{word.translation}</div>}
      </div>
    )
  }

  const getWordComp = () => {
    switch (testStore.showMode) {
      case SHOWS.all:
        return getAll()
      case SHOWS.pick:
        return getPick()
      case SHOWS.hover:
        return getHover()
      case SHOWS.flip:
        return getFlip()

      default:
        return null
    }
  }

  const increaseScore = () => {
    const categoryId = categoryStore.selectedCategory?._id
    spanishStore.editWord(categoryId, word._id, word, 1)
  }

  // console.log("word is ", categoryStore.selectedWord)
  // console.log("word is ", categoryStore.selectedWord?.text)

  const clickTrash = (e) => {
    e.stopPropagation()
    categoryStore.setSelectedWord(word)
    modalStore.openModal(modals.edit_word)
  }

  return <div>{getWordComp()}</div>
})
export default WordTest
