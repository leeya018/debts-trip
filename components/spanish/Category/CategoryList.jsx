import { observer } from "mobx-react-lite"
import { categoryStore } from "mobx/categoryStore"
import React from "react"
import Category from "./category"
import useLocalStorage from "hooks/useLocalStorage"
import { useEffect } from "react"
import { spanishStore } from "mobx/debtStore"
import { modalStore } from "mobx/modalStore"
import { modals } from "lib/util"
import EditModal from "components/Modal/Edit"
import EditIcon from "components/icons/Edit"
import Title from "ui/Title"

const CategoryList = observer(() => {
  useEffect(() => {
    spanishStore.words = []
    spanishStore.getCategories()
  }, [])

  return (
    <div className="grid grid-cols-5 gap-2 p-2">
      <EditModal />
      {spanishStore.categories?.map((c, key) => (
        <div key={key} className="flex">
          <Category category={c} />
        </div>
      ))}
    </div>
  )
})

export default CategoryList
