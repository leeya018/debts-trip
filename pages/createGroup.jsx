import React, { useState } from "react"

import Navbar from "components/site/nav"
import Footer from "components/Footer"
import StandardButton from "ui/button/standard"
import { useRouter } from "next/router"
import Title from "ui/Title"
import { debtStore } from "mobx/debtStore"
import LessInput from "ui/input/less"
import { userStore } from "mobx/userStore"
import Alerts from "components/Alerts"
import { toJS } from "mobx"
import { observer } from "mobx-react-lite"

const createGroup = observer(() => {
  const router = useRouter()
  const [copyTxt, setCopyTxt] = useState("to copy")
  const [groupName, setGroupName] = useState("")

  const copyTxtFunc = () => {
    navigator.clipboard.writeText(debtStore.group.id)
    setCopyTxt("coppied")
  }
  console.log(toJS(debtStore.group)?.id)

  const createGroup = () => {
    console.log("create group")

    debtStore.createGroup(groupName, userStore.uid)
  }

  return (
    <div className="h-[100vh] w-screen flex items-center justify-center flex-col  ">
      <div className="w-[80%] flex flex-col items-center ">
        <Navbar />
        <Title className="text-xg">This is your group Id:</Title>
        <Title className="text-lg">
          Send this Id to the people you want them to Connect with your group
        </Title>
        <LessInput
          className={""}
          value={groupName}
          placeholder="Enter Group name"
          onChange={(e) => setGroupName(e.target.value)}
        />
        {groupName.length > 0 && (
          <StandardButton onClick={createGroup} className="w-[60%]">
            Create Group
          </StandardButton>
        )}

        {debtStore.group?.id && (
          <div className="flex gap-1">
            <Title className="text-2xl flex-3">
              {debtStore.group?.id}
              {/* {toJS(debtStore.group)?.id} */}
            </Title>
            <div
              className="flex-1 cursor-pointer focus:bg-blueL"
              onClick={copyTxtFunc}
            >
              {" "}
              copy
            </div>
          </div>
        )}
        <Alerts />
        <Footer />
      </div>
    </div>
  )
})

export default createGroup
