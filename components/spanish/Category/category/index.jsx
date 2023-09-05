import EditIcon from "components/icons/Edit"
import { NavItems, modals } from "lib/util"
import { categoryStore } from "mobx/categoryStore"
import { modalStore } from "mobx/modalStore"
import { navStore } from "mobx/navStore"
import { useRouter } from "next/router"

const Category = ({ category }) => {
  const router = useRouter()

  const chosenCategory = () => {
    categoryStore.setSelectedCategory(category)
    navStore.setactiveNavItem(NavItems.words)
  }
  const clickTrash = (e) => {
    e.stopPropagation()
    categoryStore.setSelectedCategory(category)
    modalStore.openModal(modals.edit)
  }
  return (
    <div
      onClick={chosenCategory}
      className="flex justify-center cursor-pointer 
      items-center p-4 rounded-md 
      bg-blue-500 border-2 "
    >
      {category.name}
      {navStore.activeNavItem !== NavItems.test && <EditIcon onClick={clickTrash} />}
    </div>
  )
}

export default Category
