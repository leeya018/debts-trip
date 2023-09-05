import { useEffect, useState } from "react"
import { useRef } from "react"
import { stickStore } from "mobx/stickStore"
import { modalStore } from "mobx/modalStore"
import { observer } from "mobx-react-lite"

import { userStore } from "mobx/userStore"
import useLocalStorage from "hooks/useLocalStorage"
import Title from "ui/Title"
import Input from "ui/input"
import StandardButton from "ui/button/standard"
import CloseButton from "ui/button/close"
import { modals } from "lib/util"

const DeleteModal = observer(({ onRemove, title, subtitle, item }) => {
  const { closeModal, modalName } = modalStore

  const removeItem = (e) => {
    onRemove(e)
    closeModal()
  }

  return (
    <>
      <div
        className={`absolute h-screen top-0 left-0
        right-0 bottom-0 bg-slate-400 
        flex justify-center items-center z-10 bg-opacity-50  ${
          modalName === modals.remove ? "visible" : "invisible"
        }`}
      >
        <div className="relative bg-white px-8 py-4 rounded-md ">
          <div>
            <Title className="mb-4">{title}</Title>
            <CloseButton onClick={() => closeModal()} />
            <p className="mb-4">{subtitle}</p>
            <p className="text-red-500">{item}</p>

            <div className="flex justify-center gap-4 mt-4">
              <StandardButton
                variant="primary"
                onClick={() => modalStore.closeModal()}
              >
                Cancel
              </StandardButton>
              <StandardButton className="bg-red-500" onClick={removeItem}>
                Remove
              </StandardButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})

export default DeleteModal
