import React, { useState } from "react"

import { useRouter } from "next/router"
import Image from "next/image"

import { useEffect } from "react"
import is from "/images/is.png"
import us from "/images/us.png"
import { BiArrowBack } from "react-icons/bi"
import { HiMiniArrowsUpDown } from "react-icons/hi"
import { GoInfo } from "react-icons/go"
import { TbArrowBackUp } from "react-icons/tb"
import { freecurrencyapi } from "lib/util"
import { currencyStore } from "mobx/currencyStore"
import CurrencyFlag from "react-currency-flags"
import { observer } from "mobx-react-lite"
import { modalStore } from "mobx/modalStore"

const Currencies = observer(() => {
  const router = useRouter()
  const [currs, setCurrs] = useState([])

  useEffect(() => {
    freecurrencyapi.currencies().then((response) => {
      console.log(response)
      const currKeys = Object.keys(response.data)
      console.log(currKeys)
      setCurrs(currKeys)
    })
  }, [])

  const handleChooseCurr = (curr) => {
    if (currencyStore.chosenInp === "from") {
      currencyStore.setCurrencyFrom(curr)
    } else {
      currencyStore.setCurrencyTo(curr)
    }
    modalStore.closeModal()
  }

  return (
    <div className="h-[100vh] w-screen bg-secondary flex flex-col  text-calc_white  ">
      <ul className="scroll-auto overflow-y-auto">
        {currs.map((curr, key) => (
          <li key={key} className=" " onClick={() => handleChooseCurr(curr)}>
            <div className="flex justify-between items-center bg-calc_gray_m py-7 px-5">
              <CurrencyFlag
                className="rounded-full w-36 h-36"
                width={50}
                height={50}
                currency={curr}
                size="xl"
              />
              <div>{curr}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
})
export default Currencies
