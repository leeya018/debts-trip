import React from "react"
import { observer } from "mobx-react-lite"
import UpNav from "components/whatsapp/UpNav"
import Title from "components/whatsapp/Title"
import Filter from "components/whatsapp/Filter"
import Choose from "components/whatsapp/Choose"
import ArchivePanel from "components/whatsapp/ArchivePanel"
import BottomNav from "components/whatsapp/BottomNav"
import Messages from "components/whatsapp/Messages"

const index = observer(() => {
  return (
    <div className="h-[100vh] w-screen bg-secondary flex flex-col  px-2">
      <UpNav />
      <Title>WA Bussiness</Title>
      <Filter />
      <Choose />
      <ArchivePanel />
      <Messages /> 
      <BottomNav />
    </div>
  )
})

export default index
