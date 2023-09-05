import EditIcon from "components/icons/Edit"
import BlueButton from "components/site/content/buttons/blue"
import WordTest from "components/spanish/Word/word/test"
import { NavItems, modals } from "lib/util"
import { observer } from "mobx-react-lite"
import { categoryStore } from "mobx/categoryStore"
import { modalStore } from "mobx/modalStore"
import { navStore } from "mobx/navStore"
import { testStore } from "mobx/testStore"
import { useRouter } from "next/router"
import StandardButton from "ui/button/standard"

const CategoryTest = observer(({ category }) => {
  const router = useRouter()

  console.log(testStore.isShowWords)
  const clickCategory = () => {
    testStore.setIsShowWords(true)
    testStore.setWords(category)
  }

  return (
    <div>
      <div
        onClick={clickCategory}
        className="flex justify-center cursor-pointer 
items-center p-4 rounded-md 
bg-blue-500 border-2 "
      >
        {category.name}
      </div>
    </div>
  )
})

export default CategoryTest
