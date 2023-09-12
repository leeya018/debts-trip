import React from "react"

import { useRouter } from "next/router"

import { tripStore } from "mobx/tripStore"
import { observer } from "mobx-react-lite"
import Title from "ui/Title"
import LessInput from "ui/input/less"
import StandardButton from "ui/button/standard"

const index = observer(({}) => {
  const router = useRouter()

  return (
    <div className="h-[100vh] w-screen bg-secondary flex justify-center ">
      <div className="w-[50%] flex flex-col">
        <Title>chooese budget</Title>
        <LessInput
          value={tripStore.budget}
          onChange={(e) => tripStore.setBudget(e.target.value)}
          className="w-30"
          placeholder="add name"
        />
        <StandardButton
          className="bg-blueL"
          variant="primary"
          onClick={() => router.push("trip1")}
        >
          Sed budget
        </StandardButton>{" "}
      </div>
    </div>
  )
})
export default index
