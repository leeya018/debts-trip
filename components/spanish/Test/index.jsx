import { observer } from "mobx-react-lite"
import { categoryStore } from "mobx/categoryStore"
import React, { use, useState } from "react"
import Category from "../Category/category"
import useLocalStorage from "hooks/useLocalStorage"
import { useEffect } from "react"
import { toJS } from "mobx"

import { spanishStore } from "mobx/debtStore"
import { modalStore } from "mobx/modalStore"
import { modals } from "lib/util"
import EditModal from "components/Modal/Edit"
import EditIcon from "components/icons/Edit"
import Title from "ui/Title"
import CategoryTest from "../Category/category/test"
import { navStore } from "mobx/navStore"
import { testStore } from "mobx/testStore"
import BlueButton from "components/site/content/buttons/blue"
import WordTest from "../Word/word/test"
import Modes from "./Modes"

const Test = observer(() => {
  useEffect(() => {
    testStore.getAllCats()
  }, [navStore.activeNavItem])

  console.log("testStore.categories")
  console.log(toJS(testStore.categoriesa))

  const showCategories = () => {
    return (
      <div className=" w-screen flex flex-col justify-center items-center relative ">
        <Title>Categories</Title>
        <div className="grid grid-cols-5 gap-2 p-2">
          {testStore.categories?.map((c, key) => (
            <div key={key} className="flex">
              <CategoryTest category={c} />
            </div>
          ))}
        </div>
      </div>
    )
  }
  const showWords = () => {
    return (
      <div className=" w-screen flex justify-center items-center relative ">
        <BlueButton
          className="absolute top-0 left-0"
          onClick={() => testStore.setIsShowWords(false)}
        >
          Go back
        </BlueButton>
        {/* <div className=" flex flex-col"> */}
        <Modes className="absolute top-0 " />
        <div
          className="mt-20 w-[100vw]  grid grid-cols-4 gap-2
          "
        >
          {testStore.words?.map((w, key) => (
            <WordTest word={w} key={key} />
          ))}
        </div>
      </div>
      // </div>
    )
  }

  return (
    <div className=" w-screen flex flex-col justify-center items-center relative ">
      <div className="grid grid-cols-5 gap-2 p-2">
        <EditModal />
        {!testStore.isShowWords && showCategories()}
        {testStore.isShowWords && showWords()}
      </div>
    </div>
  )
})

export default Test
