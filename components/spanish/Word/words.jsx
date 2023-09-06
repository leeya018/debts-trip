import React, { useState } from "react"
import Button from "ui/button"

import { useEffect } from "react"
import { userStore } from "mobx/userStore"
import { useRouter } from "next/router"
import { observer } from "mobx-react-lite"
import { navStore } from "mobx/navStore"
import { categoryStore } from "mobx/categoryStore"
import { spanishStore } from "mobx/debtStore"
import AddWord from "./Add"
import EditIcon from "components/icons/Edit"
import { NavItems, SHOWS, modals } from "lib/util"
import { modalStore } from "mobx/modalStore"
import EditWordModal from "components/Modal/EditWordModal"
import Word from "./word"
import Title from "ui/Title"
import { testStore } from "mobx/testStore"

const Caegtories = observer(() => {
  const [words, setWords] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  // console.log(categoryStore.selectedCategory)
  useEffect(() => {
    const catId = categoryStore.getSelectedCategory()?._id

    spanishStore.getWords(catId)
  }, [categoryStore.selectedCategory])

  return (
    <div className="overflow-y-scroll">
      <div>{testStore.show}</div>
      <Title>category: {categoryStore.getSelectedCategory()?.name}</Title>
      <EditWordModal />
      <AddWord />
      <div className=" flex justify-center items-center">
        <div
          className="w-[70vw]  grid grid-cols-4 gap-2
         "
        >
          {spanishStore?.words?.map((w, key) => (
            <Word word={w} key={key} />
          ))}
        </div>
      </div>
    </div>
  )
})
export default Caegtories
