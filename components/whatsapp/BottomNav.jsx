import React from "react"
import { GrUpdate } from "react-icons/gr"
import { BiPhoneCall } from "react-icons/bi"
import { BiSolidPhoneCall } from "react-icons/bi"
import { MdStorefront } from "react-icons/md"
import { GrSettingsOption } from "react-icons/gr"
import { BsChat } from "react-icons/bs"

import { PiPhoneCallFill } from "react-icons/pi"
import { BsFillChatFill } from "react-icons/bs"
import { useRouter } from "next/router"
import { NavItems } from "lib/util"
import { navStore } from "mobx/navStore"
import { observer } from "mobx-react-lite"

const blue = "#0278AE"
const BottomNav = observer(() => {
  const router = useRouter()

  const handleClick = (name) => {
    navStore.setActiveNavItem(name)
    // router.push(NavItems.updates)
  }
  console.log(navStore.activeNavItem)
  return (
    <div
      className="w-full  h-10 
    flex justify-between items-center absolute bottom-0 py-2  text-whats_gray_t"
    >
      <Item
        name={NavItems.updates}
        onClick={() => handleClick(NavItems.updates)}
        notFill={<GrUpdate className="w-6 h-6" color="whats_blue" />}
        fill={
          <GrUpdate className="w-6 h-6" fill={blue} style={{ color: blue }} />
        }
      />
      <Item
        name={NavItems.calls}
        onClick={() => handleClick(NavItems.calls)}
        notFill={<PiPhoneCallFill className="w-6 h-6" />}
        fill={<PiPhoneCallFill className="w-6 h-6" fill={blue} />}
      />
      <Item
        name={NavItems.tools}
        onClick={() => handleClick(NavItems.tools)}
        notFill={<MdStorefront className="w-6 h-6" />}
        fill={<MdStorefront className="w-6 h-6" fill={blue} />}
      />
      <Item
        name={NavItems.chats}
        onClick={() => handleClick(NavItems.chats)}
        notFill={<BsChat className="w-6 h-6" />}
        fill={<BsFillChatFill className="w-6 h-6 " fill={blue} />}
      />
      <Item
        name={NavItems.settings}
        onClick={() => handleClick(NavItems.settings)}
        notFill={<GrSettingsOption className="w-6 h-6" color="#0278AE" />}
        fill={<GrSettingsOption className="w-6 h-6" fill={blue} />}
      />
    </div>
  )
})
export default BottomNav

function Item({ fill, notFill, onClick, name }) {
  return (
    <div
      className="flex flex-col justify-center items-center"
      onClick={onClick}
    >
      {navStore.activeNavItem === name ? fill : notFill}

      <div>{name}</div>
    </div>
  )
}
