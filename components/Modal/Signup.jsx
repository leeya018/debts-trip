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
import { PATH_NAMES, modals } from "lib/util"
import { useRouter } from "next/router"

const DeleteModal = observer(({ onRemove, title, subtitle, item }) => {
  const router = useRouter()

  const { modalName } = modalStore

  const handleClick = () => {
    modalStore.closeModal()
    router.push(PATH_NAMES.login)
  }
  return (
    <>
      <div
        className={`absolute h-screen top-0 left-0
        right-0 bottom-0 bg-slate-400 
        flex justify-center items-center z-10 bg-opacity-50  ${
          modalName === modals.signup ? "visible" : "invisible"
        }`}
      >
        <div className="relative bg-white px-8 py-4 rounded-md ">
          <div>
            <Title className="mb-4">Signup success</Title>
            <p
              onClick={handleClick}
              className="text-red-500 underline text-blueL"
            >
              go to Login
            </p>
          </div>
        </div>
      </div>
    </>
  )
})

export default DeleteModal
