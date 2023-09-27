import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import AddDetails from "components/belives/AddDetails"
import axios from "axios"
import StandardButton from "ui/button/standard"
import Title from "ui/Title"
import LessInput from "ui/input/less"
import API, { askGptApi, getBelivesApi, saveBelivesApi } from "api"
import ColoredText from "./ColoredText"
import { asyncStore } from "mobx/asyncStore"
import { CSpinner } from "@coreui/bootstrap-react"

const AffirmationFind = observer(() => {
  const [hover, setHover] = useState(false)
  const listRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const [userBelives, setUserBelives] = useState({})
  const [belief, setBelief] = useState("")
  const [affirmationsLim, setAffirmationsLim] = useState(3)
  // const [affirmations, setAffirmations] = useState([])
  const [affirmations, setAffirmations] = useState([
    // "I am a fast learner.",
    // "I have an incredible memory.",
    // "I absorb knowledge quickly and easily.",
    // "I retain information effortlessly.",
    // "My memory is sharp and efficient.",
    // "I have a natural ability to learn and remember things.",
    // "I effortlessly grasp new concepts and apply them.",
    // "I am a quick thinker and problem solver.",
    // "I excel at learning and retaining information.",
    // "My mind is sharp and focused.",
    // "I have a photographic memory.",
    // "Learning comes naturally to me.",
  ])
  const [lineNum, setLineNum] = useState(0)
  const [isStart, setIsStart] = useState(false)

  useEffect(() => {
    getBelivesApi().then((res) => {
      console.log(res)
      setUserBelives(res.beliefs)
    })
  }, [])

  const handleFocus = () => {
    setIsFocused(true)
  }

  // Handle input blur
  const handleBlur = (e) => {
    if (!listRef.current?.contains(e.target?.value)) {
      setIsFocused(false)
    }
  }
  const increaseLineNum = () => {
    setLineNum((prev) => prev + 1)
  }
  const chooseUserAffirmation = (userBelif) => {
    setBelief(userBelif.name)
    setAffirmations(userBelif.affirmations)
    setIsFocused(false)
  }
  const generateAffirmations = async () => {
    if (!belief || asyncStore.isLoading) {
      return
    }

    const end = "( give me the affirmations in array, each one in each cell)"
    const start = `give me ${affirmationsLim} affirmations that for someone who wants to have the belivef of : `
    const question = `${start} ${belief} ${end}`
    try {
      asyncStore.setIsLoading(true)
      const res = await askGptApi({
        question,
      })
      asyncStore.setIsLoading(false)
      console.log(res.data.message.content)
      const tempAffirmations = JSON.parse(res.data.message.content)
      setAffirmations(tempAffirmations)
      saveBelivesApi(belief, tempAffirmations)
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
        {hover && (
          <div className="absolute  left-1/2 transform  -translate-y\ -translate-x-1/2 border border-gray-300 p-2 bg-gray-100 text-sm whitespace-nowrap z-50">
            <p>clicks are limited according to your plan clicks are limited</p>
            according to your plan clicks are limited according to your plan
          </div>
        )}
      </div>
      <LessInput
        placeholder="add belife"
        className=""
        onChange={(e) => setBelief(e.target.value)}
        value={belief}
        onFocus={handleFocus} // On focus, display the list
        onBlur={handleBlur}
      />
      {isFocused && (
        <ul className=" flex flex-col gap-1 " ref={listRef}>
          {userBelives
            .filter((userBelif) => userBelif.name.includes(belief))
            .map((userBelif, index) => (
              <li
                className="cursor-pointer bg-whats_gray_t hover:bg-whats_gray_i"
                key={index}
                onClick={() => chooseUserAffirmation(userBelif)}
              >
                {userBelif.name}
              </li>
            ))}
        </ul>
      )}

      <div>{hover}</div>
      <StandardButton
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={generateAffirmations}
        className="bg-belief_pink"
      >
        Generate Affirmations
      </StandardButton>
      <div>{setBelief}</div>
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
            lineNum={lineNum}
            affirmations={affirmations}
            setIsStart={setIsStart}
            inputText={affirmations[lineNum]}
            increaseLineNum={increaseLineNum}
          />
        )}
      </div>
    </div>
  )
})

export default AffirmationFind
