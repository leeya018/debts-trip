import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import axios from "axios"
import StandardButton from "ui/button/standard"
import Title from "ui/Title"
import LessInput from "ui/input/less"
import API, { askGptApi, getBelivesApi, saveBelivesApi } from "api"
import ColoredText from "../components/belives/ColoredText"
import { asyncStore } from "mobx/asyncStore"
import { CSpinner } from "@coreui/bootstrap-react"
import FilterBelive from "components/belives/FilterBelive"
import { filterStore } from "mobx/filterStore"

const AffirmationFind = observer(() => {
  const [hover, setHover] = useState(false)

  const [lineNum, setLineNum] = useState(0)
  const [isStart, setIsStart] = useState(false)
  const [speed, setSpeed] = useState(20)
  const [affirmationsLim, setAffirmationsLim] = useState(3)

  const resetAffirmations = (e) => {
    setIsStart(false)
    setLineNum(0)
    filterStore.setIsFocused(false)
  }

  const increaseLineNum = () => {
    setLineNum((prev) => prev + 1)
  }

  const handleSpeed = (event) => {
    setSpeed(event.target.value)
    setLineNum(0)
  }
  const generateAffirmations = async () => {
    if (!filterStore.belief || asyncStore.isLoading) {
      return
    }

    const end = "( give me the affirmations in array, each one in each cell)"
    const start = `give me ${affirmationsLim} affirmations that for someone who wants to have the belivef of : `
    const question = `${start} ${filterStore.belief} ${end}`
    try {
      asyncStore.setIsLoading(true)
      const res = await askGptApi({
        question,
      })
      asyncStore.setIsLoading(false)
      console.log(res.data.message.content)
      const tempAffirmations = JSON.parse(res.data.message.content)
      filterStore.setAffirmations(tempAffirmations)
      saveBelivesApi(filterStore.belief, tempAffirmations)
    } catch (error) {
      asyncStore.setIsLoading(false)
      console.log(error)
    }
  }

  console.log(lineNum)
  return (
    <div className="h-[100vh] w-screen bg-secondary flex flex-col  px-2">
      <Title>Choose Belief</Title>
      <div className="flex items-center mb-2">
        <div>affirmations:</div>
        <input
          type="number"
          className="w-20 h-10 border-2 rounded-sm ml-3"
          min={2}
          max={10}
          value={affirmationsLim}
          onChange={(e) => setAffirmationsLim(e.target.value)}
        />
        {isStart && filterStore.affirmations.length > lineNum && (
          <div className="ml-2">
            <input
              type="range"
              min="0"
              max="50"
              className="z-50"
              value={speed}
              onChange={handleSpeed}
            />
            <div className="flex justify-center items-center">
              speed : {speed}
            </div>
          </div>
        )}
      </div>
      {/* //input */}
      <FilterBelive />

      <div>{hover}</div>
      <StandardButton
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={generateAffirmations}
        className="bg-belief_pink"
      >
        <p>Generate Affirmations </p>
        <span className="text-sm"> (limited)</span>
      </StandardButton>
      {/* <div>{setBelief}</div> */}
      <div>
        <ul className="flex flex-col gap-1">
          <StandardButton
            className="bg-belief_green"
            onClick={() => setIsStart(true)}
          >
            Start Affirmations
          </StandardButton>
          {asyncStore.isLoading && (
            <CSpinner className="mt-10" color="primary" />
          )}

          {!isStart &&
            filterStore.affirmations.length > 0 &&
            filterStore.affirmations?.map((affirmation, key) => (
              <li key={key} className="" onClick={() => {}}>
                <div className="flex justify-between items-center bg-belief_blue text-white shadow-xl py-7 px-5">
                  {affirmation}
                </div>
              </li>
            ))}
        </ul>
        {isStart && filterStore.affirmations.length > lineNum && (
          <div>
            <ColoredText
              lineNum={lineNum}
              resetAffirmations={resetAffirmations}
              inputText={filterStore.affirmations[lineNum]}
              increaseLineNum={increaseLineNum}
              speed={speed}
            />
          </div>
        )}
      </div>
    </div>
  )
})

export default AffirmationFind
