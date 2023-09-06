import { useEffect, useState } from "react"
import { useRef } from "react"
import { modalStore } from "mobx/modalStore"
import { observer } from "mobx-react-lite"

import { userStore } from "mobx/userStore"
import useLocalStorage from "hooks/useLocalStorage"
import Title from "ui/Title"
import Input from "ui/input"
import StandardButton from "ui/button/standard"
import CloseButton from "ui/button/close"
import { modals } from "lib/util"
import { categoryStore } from "mobx/categoryStore"
import { spanishStore } from "mobx/debtStore"

const EditWordModal = observer(() => {
  const { modalName, closeModal } = modalStore
  const { selectedCategory, selectedWord } = categoryStore
  const [categoryName, setCategoryName] = useState("")
  const [text, setText] = useState(selectedWord?.text)
  const [translation, setTrnaslation] = useState(selectedWord?.translation)

  const inputRef = useRef()

  useEffect(() => {
    setCategoryName(selectedCategory?.name)
    console.log(selectedCategory?.name)
  }, [modalName, selectedCategory])

  const onRemove = async () => {
    await spanishStore.removeWord(selectedCategory._id, selectedWord._id)
    modalStore.closeModal()
  }
  const onUpdate = async () => {
    await spanishStore.editWord(selectedCategory._id, selectedWord._id, {
      text,
      translation,
    })
    modalStore.closeModal()
  }

  return (
    <>
      <div
        className={`absolute h-screen top-0 left-0
     right-0 bottom-0 bg-slate-400 
     flex justify-center items-center z-10 bg-opacity-50 ${
       modalName === modals.edit_word ? "visible" : "invisible"
     }`}
      >
        <div className="relative border-[1px] p-2 bg-white px-4 py-2 rounded-md">
          <div>
            <Title className="mb-4">Edit Word</Title>
            <CloseButton onClick={() => closeModal()} />
            <Input
              ref={inputRef}
              placeholder="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Input
              ref={inputRef}
              placeholder="translation"
              value={translation}
              onChange={(e) => setTrnaslation(e.target.value)}
            />

            <div style={{ display: "flex", justifyContent: "center" }}>
              <StandardButton
                className="bg-blueL  hover:bg-white hover:text-blueL"
                variant="primary"
                onClick={onUpdate}
              >
                Update
              </StandardButton>
              <StandardButton
                className="bg-red hover:bg-white hover:text-red"
                variant="primary"
                onClick={onRemove}
              >
                Remove
              </StandardButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})

export default EditWordModal
