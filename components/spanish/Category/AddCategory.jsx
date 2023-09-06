import useLocalStorage from "hooks/useLocalStorage"
import { observer } from "mobx-react-lite"
import { categoryStore } from "mobx/categoryStore"
import LessInput from "ui/input/less"
import CategoryList from "./CategoryList"
import { useEffect } from "react"
import { spanishStore } from "mobx/debtStore"
import { navStore } from "mobx/navStore"
import { NavItems } from "lib/util"
import Title from "ui/Title"

const AddCategory = observer(() => {
  useEffect(() => {
    const catId = categoryStore.getSelectedCategory()?._id
    if (catId) {
      navStore.setactiveNavItem(NavItems.words)
    }
  }, [])

  const add = (e) => {
    if (e.code === "Enter" && e.target.value != "") {
      spanishStore.addCategory(e.target.value)
      e.target.value = ""
      console.log(spanishStore.categories)
    }
  }
  return (
    <div className="w-full flex flex-col items-center mt-20">
      <Title>categories</Title>
      <LessInput
        className="w-30"
        placeholder="add new Category"
        onKeyDown={add}
      />
      <CategoryList />
    </div>
  )
})

export default AddCategory
