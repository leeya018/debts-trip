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

const EditModal = observer(() => {
  const { modalName, closeModal } = modalStore
  const { selectedCategory } = categoryStore
  const [categoryName, setCategoryName] = useState("")

  const inputRef = useRef()

  useEffect(() => {
    setCategoryName(selectedCategory?.name)
    console.log(selectedCategory?.name)
  }, [modalName, selectedCategory])

  const onRemove = async () => {
    await spanishStore.deleteCategory(selectedCategory._id)
    modalStore.closeModal()
  }
  const onUpdate = async () => {
    await spanishStore.editCategory(selectedCategory._id, categoryName)
    modalStore.closeModal()
  }

  return (
    <>
      <div
        className={`absolute h-screen top-0 left-0
     right-0 bottom-0 bg-slate-400 
     flex justify-center items-center z-10 bg-opacity-50 ${
       modalName === modals.edit ? "visible" : "invisible"
     }`}
      >
        <div className="relative border-[1px] p-2 bg-white px-4 py-2 rounded-md">
          <div>
            <Title className="mb-4">Edit Stick</Title>
            <CloseButton onClick={() => closeModal()} />
            <p className="mb-4">Update Category : </p>
            <Input
              ref={inputRef}
              placeholder="Stick question"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
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

export default EditModal
