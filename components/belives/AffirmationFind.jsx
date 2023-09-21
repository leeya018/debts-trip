import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import AddDetails from "components/belives/AddDetails"
import axios from "axios"
import StandardButton from "ui/button/standard"
import Title from "ui/Title"
import LessInput from "ui/input/less"
import API, { askGpt } from "api"
import ColoredText from "./ColoredText"
import { asyncStore } from "mobx/asyncStore"
import { CSpinner } from "@coreui/bootstrap-react"

const AffirmationFind = observer(() => {
  const [belief, setBelief] = useState("")
  const [affirmations, setAffirmations] = useState([])
  // const [affirmations, setAffirmations] = useState([
  //   "serntseitnsaetsr",
  //   "432432432432",
  //   "serntseitnsaetsr",
  //   "4432423443",
  //   "serntseitnsaetsr",
  // ])
  const [lineNum, setLineNum] = useState(0)
  const [isStart, setIsStart] = useState(false)

  const increaseLineNum = () => {
    setLineNum((prev) => prev + 1)
  }
  const generateAffirmations = async () => {
    if (!belief || asyncStore.isLoading) {
      return
    }

    const end = "( give me the affirmations in array, each one in each cell)"
    const start =
      "give me 6 affirmations that for someone who wants to have the belivef of : "
    const question = `${start} ${belief} ${end}`
    try {
      asyncStore.setIsLoading(true)
      const res = await askGpt({
        question,
      })
      asyncStore.setIsLoading(false)
      console.log(res.data.message.content)
      setAffirmations(JSON.parse(res.data.message.content))
    } catch (error) {
      asyncStore.setIsLoading(false)
      console.log(error)
    }
  }

  console.log(lineNum)
  return (
    <div className="h-[100vh] w-screen bg-secondary flex flex-col  px-2">
      {/* <AddDetails /> */}
      <Title>Choose Belief</Title>
      <LessInput
        placeholder="add belife"
        className=""
        onChange={(e) => setBelief(e.target.value)}
        value={belief}
      />
      <StandardButton onClick={generateAffirmations}>
        Generate Affirmations
      </StandardButton>
      <div>{setBelief}</div>
      <div>
        <ul className="flex flex-col gap-1">
          <StandardButton onClick={() => setIsStart(true)}>
            Start Affirmations
          </StandardButton>
          {asyncStore.isLoading && (
            <CSpinner className="mt-10" color="primary" />
          )}

          {!isStart &&
            affirmations.length > 0 &&
            affirmations?.map((affirmation, key) => (
              <li key={key} className="" onClick={() => {}}>
                <div className="flex justify-between items-center bg-belief_blue text-white shadow-xl py-7 px-5">
                  {affirmation}
                </div>
              </li>
            ))}
        </ul>
        {isStart && affirmations.length > lineNum && (
          <ColoredText
            inputText={affirmations[lineNum]}
            increaseLineNum={increaseLineNum}
          />
        )}
      </div>
    </div>
  )
})

export default AffirmationFind
