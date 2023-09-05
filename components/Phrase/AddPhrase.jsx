import { observer } from "mobx-react-lite"
import { categoryStore } from "mobx/categoryStore"
import { useState } from "react"
import Title from "ui/Title"
import StandardButton from "ui/button/standard"
import LessInput from "ui/input/less"

const AddPhrase = observer(({ category }) => {
  const [text, setText] = useState("tratar")
  const [translation, setTranslation] = useState("fff")

  const add = (e) => {
    category.addPhrase({ text, translation })
    setText("")
    setTranslation("")
  }
  return (
    <div className="w-[50%] flex flex-col items-center">
      <Title>add to {category.name}</Title>
      <LessInput
        value={text}
        placeholder="add text"
        onChange={(e) => setText(e.target.value)}
      />
      <LessInput
        value={translation}
        placeholder="add translation"
        onChange={(e) => setTranslation(e.target.value)}
      />
      <StandardButton onClick={add}>add phrase</StandardButton>
    </div>
  )
})

export default AddPhrase
