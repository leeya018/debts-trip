import React, { useState } from "react"
import Item from "./item"
import AirplayIcon from "@mui/icons-material/Airplay"
import { SideItems } from "lib/util"
import { sideStore } from "mobx/sideStore"
import { observer } from "mobx-react-lite"

const Side = observer(() => {
  // console.log(sideStore.activeTab)

  return (
    <div className="h-[100vh] w-[285px] bg-primary flex flex-col">
      <div
        className="h-20 px-10 py-5 w-[285px] bg-primary  mr-auto
       text-white flex justify-center items-center
       gap-2 border-b-[1px] b-block"
      >
        <AirplayIcon className="w-10 h-10" />
        LeeDev
      </div>
      <ul className="flex flex-col pt-12 items-center h-full overflow-y-scroll  ">
        <Item
          text={"How To Get Rich"}
          onClick={() => sideStore.setActiveTab(SideItems.rich)}
          name={SideItems.rich}
        />
        <Item
          text={"Get Massive Results"}
          onClick={() => sideStore.setActiveTab(SideItems.res)}
          name={SideItems.res}
        />
        <Item
          text={"Get Your Dreams Now"}
          onClick={() => sideStore.setActiveTab(SideItems.dream)}
          name={SideItems.dream}
        />
        <Item
          text={"10X Your Action"}
          onClick={() => sideStore.setActiveTab(SideItems.action)}
          name={SideItems.action}
        />
        <Item
          text={"Break Your Limiting Belives"}
          onClick={() => sideStore.setActiveTab(SideItems.break)}
          name={SideItems.break}
        />
        {/* <Item text={"Act Now"} name={SideItems.canv} />
        <Item text={"Grow Exponentially"} name={SideItems.canv} /> */}
        {/* <Item />
        <Item />
        <Item /> */}
      </ul>
    </div>
  )
})

export default Side
