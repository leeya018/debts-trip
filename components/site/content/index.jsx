import React from "react"
import CtrlWolrd from "./buttons/CtrlWolrd"
import GetBetterLife from "./buttons/GetBetterLife"
import Middle from "./Middle"
import Bottom from "./Bottom"
import Caegtories from "components/spanish/Word/words"
import AddCategory from "components/spanish/Category/AddCategory"
import CategoryList from "components/spanish/Category/CategoryList"
import { navStore } from "mobx/navStore"
import { NavItems } from "lib/util"
import { observer } from "mobx-react-lite"
import ButtonHelp from "./buttons/GetBetterLife"
import Test from "components/spanish/Test"
import Premium from "components/spanish/Premium"

const Content = observer(() => {
  const { activeNavItem, setactiveNavItem } = navStore
  console.log({ activeNavItem, DATA: NavItems.dash })
  const getData = () => {
    switch (activeNavItem) {
      case NavItems.categories:
        return <AddCategory />
      case NavItems.words:
        return <Caegtories />
      case NavItems.test:
        return <Test />
      case NavItems.prem:
        return <Premium />

      default:
        return <div>no data</div>
    }
  }
  return (
    <div className="flex-1 flex flex-col mx-10 overflow-y-auto h-[90vh] gap-3">
      {activeNavItem && getData()}

      {!activeNavItem && (
        <>
          <div className="h-20 mt-10 flex justify-between ">
            <div className="h-10 mt-auto flex justify-center items-center">
              <div className="text-2xl">Configuring our database</div>
            </div>

            <div className="flex gap-2 mt-auto">
              <ButtonHelp />
              <CtrlWolrd />
            </div>
          </div>

          <Middle />
          <Bottom />
        </>
      )}
    </div>
  )
})

export default Content
