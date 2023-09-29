import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import LessInput from "ui/input/less"
import { getBelivesApi } from "api"
import { filterStore } from "mobx/filterStore"

const FilterBelive = observer(() => {
  const blurTimeoutRef = useRef(null)
  const listRef = useRef(null)
  const [userBelives, setUserBelives] = useState({})
  const { setBelief, setAffirmations, setIsFocused, belief, isFocused } =
    filterStore

  useEffect(() => {
    getBelivesApi().then((res) => {
      console.log(res)
      setUserBelives(res)
    })
  }, [])

  const chooseUserAffirmation = (userBelif) => {
    setBelief(userBelif.name)
    setAffirmations(userBelif.affirmations)
    setIsFocused(false)
    clearTimeout(blurTimeoutRef.current)
  }
  const handleFocus = () => {
    setIsFocused(true)
  }
  const handleBlur = (e) => {
    blurTimeoutRef.current = setTimeout(() => {
      setIsFocused(false)
    }, 200)
  }
  return (
    <div className="w-full">
      <LessInput
        placeholder="add belife"
        className="w-full"
        onChange={(e) => setBelief(e.target.value)}
        value={belief}
        onFocus={handleFocus} // On focus, display the list
        onBlur={handleBlur}
      />
      {isFocused && (
        <ul className=" flex flex-col gap-1 " ref={listRef}>
          {userBelives.length > 0 &&
            userBelives
              .filter((userBelif) => userBelif.name?.includes(belief))
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
    </div>
  )
})

export default FilterBelive
