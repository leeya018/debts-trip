import useLocalStorage from "hooks/useLocalStorage"
import { observer } from "mobx-react-lite"
import { categoryStore } from "mobx/categoryStore"
import LessInput from "ui/input/less"
import { useEffect, useState } from "react"
import { spanishStore } from "mobx/spanishStore"
import StandardButton from "ui/button/standard"

const AddWord = observer(() => {
  const [text, setText] = useState("")
  const [translation, setTrnaslation] = useState("")

  const add = () => {
    spanishStore.addWord(categoryStore.selectedCategory._id, {
      text,
      translation,
    })
  }
  return (
    <div className="w-full flex flex-col items-center mt-20">
      {/* <input type="text" /> */}
      <LessInput
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-30"
        placeholder="add text"
      />
      <LessInput
        value={translation}
        onChange={(e) => setTrnaslation(e.target.value)}
        className="w-30"
        placeholder="add translation"
      />
      <StandardButton
        className="bg-blueL  hover:bg-white hover:text-blueL"
        variant="primary"
        onClick={add}
      >
        Add Word
      </StandardButton>{" "}
    </div>
  )
})

export default AddWord
