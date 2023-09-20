import React from "react"
import { observer } from "mobx-react-lite"
import AddDetails from "components/belives/AddDetails"

const index = observer(() => {
  return (
    <div className="h-[100vh] w-screen bg-secondary flex flex-col  px-2">
      <AddDetails />
    </div>
  )
})

export default index
