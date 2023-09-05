import { observer } from "mobx-react-lite"
import { data } from "../../../lib/util"
import { sideStore } from "mobx/sideStore"
import React from "react"

const Bottom = observer(() => {
  const dataItem = data[sideStore.activeTab]
  return (
    <div className="flex flex-col mt-5 ml-5 ">
      <div className="font-bold underline ">{dataItem?.title}</div>
      <div className="flex flex-col gap-5 text-blueL my-5">
        {dataItem?.subs.map((text, key) => (
          <div key={key}>{text}</div>
        ))}
      </div>
      <div className=" flex flex-col gap-6">
        {dataItem?.info.map((text, key) => (
          <div key={key}>{text}</div>
        ))}
      </div>
    </div>
  )
})
export default Bottom
