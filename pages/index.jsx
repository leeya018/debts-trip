import React from "react"
import { observer } from "mobx-react-lite"
import UpNav from "components/whatsapp/UpNav"

const index = observer(() => {
  return (
    <div className="h-[100vh] w-screen bg-secondary flex flex-col  px-2">
      <UpNav />
      {/* <Title>WA Bussiness</Title>
    <Filter />
    <Choose />
    <ArchivePanel />
    <BottomNav /> */}
    </div>
  )
})

export default index
