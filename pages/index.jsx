import React, { useState } from "react"

import { useRouter } from "next/router"
import Image from "next/image"

import { useEffect } from "react"
import is from "/images/is.png"
import us from "/images/us.png"
import { BiArrowBack } from "react-icons/bi"
import { RiArrowUpDownFill } from "react-icons/ri"
import { GoInfo } from "react-icons/go"
import { TbArrowBackUp } from "react-icons/tb"
import axios from "axios"
import { currencyStore } from "mobx/currencyStore"
import { debtStore } from "mobx/debtStore"
import { observer } from "mobx-react-lite"
import CurrencyFlag from "react-currency-flags"
import { formatDate, formatTime, freecurrencyapi, modals } from "lib/util"
import Currencies from "components/currencies"
import { modalStore } from "mobx/modalStore"

const index = observer(() => {
  const router = useRouter()
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [today, setToday] = useState(new Date())
  const [rate, setRate] = useState(1)

  useEffect(() => {
    freecurrencyapi
      .latest({
        base_currency: currencyStore.currencyFrom,
        currencies: currencyStore.currencyTo,
      })
      .then((response) => {
        console.log(response)
        const rate = response.data[currencyStore.currencyTo]
        setResult((rate * input).toFixed(2))
        setRate(rate)
      })
  }, [
    input,
    debtStore.currencyFrom,
    debtStore.currencyTo,
    debtStore.choenInp,
    modalStore.modalName,
  ])

  useEffect(() => {
    const inter = setInterval(() => {
      setToday(new Date())
    }, 1000)
    return () => clearInterval(inter)
  }, [])

  const switchInputs = () => {
    let temp = input
    setInput(result)
    setResult(temp)
    currencyStore.switchCurr()
  }
  const handleButtonClick = (value) => {
    setInput((prev) => prev + value)
  }

  const showCurrencyies = (inputN = "from") => {
    modalStore.openModal(modals.currency)
    currencyStore.setChosenInp(inputN)
  }
  const calculate = () => {
    try {
      setInput(eval(input).toString())
    } catch (error) {
      setInput("Error")
    }
  }
  const clearInput = () => {
    setInput("")
  }
  const backspace = () => {
    setInput((prev) => {
      if (prev) {
        return prev.slice(0, -1)
      }
    })
  }

  return (
    <div className="h-[100vh] w-screen bg-secondary flex flex-col  text-calc_white  ">
      {modalStore.modalName === modals.currency && <Currencies />}
      {/* source currency */}
      {modalStore.modalName !== modals.currency && (
        <div className="h-36 flex  justify-between items-center px-5 bg-calc_gray_l ring-0">
          <div className="flex flex-col justify-center items-center">
            <CurrencyFlag
              className="rounded-full w-36 h-36"
              width={50}
              height={50}
              currency={currencyStore.currencyFrom}
              size="xl"
              onClick={() => {
                modalStore.openModal(modals.currency)
                currencyStore.setChosenInp("from")
              }}
            />
            <div>{currencyStore.currencyFrom}</div>
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput((prev) => {
                if (prev) {
                  return e.target.valuerget.value
                }
                return 0
              })
            }}
            className="flex w-full h-full bg-calc_gray_l"
          />
        </div>
      )}
      {/* target currency */}
      {!modalStore.modalName !== modals.currency && (
        <div className="h-36 flex justify-between  items-center px-5 bg-calc_gray_l ring-0">
          <div className="flex flex-col justify-center items-center">
            <CurrencyFlag
              onClick={() => {
                modalStore.openModal(modals.currency)
                currencyStore.setChosenInp("to")
              }}
              className="rounded-full w-36 h-36"
              width={50}
              height={50}
              currency={currencyStore.currencyTo}
              size="xl"
            />
            <div>{currencyStore.currencyTo}</div>
          </div>
          <input
            type="text"
            value={result}
            className="flex w-full h-full bg-calc_gray_l"
          />
        </div>
      )}
      {/* calculator */}
      {!modalStore.modalName !== modals.currency && (
        <div className="flex-1 h-full grid grid-cols-4 grid-rows-4 ">
          <button
            onClick={() => clearInput()}
            className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_m"
          >
            {" "}
            C
          </button>
          <button
            onClick={() => backspace()}
            className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_m"
          >
            {" "}
            <BiArrowBack size={20} color="white" />
          </button>
          <button
            onClick={switchInputs}
            className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_m"
          >
            {" "}
            <RiArrowUpDownFill size={20} color="white" />
          </button>
          <button
            onClick={() => handleButtonClick("/")}
            className="w-full h-full flex justify-center items-center text-2xl bg-calc_orange"
          >
            {" "}
            /
          </button>
          <button
            onClick={() => handleButtonClick("7")}
            className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s"
          >
            {" "}
            7
          </button>
          <button
            onClick={() => handleButtonClick("8")}
            className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s"
          >
            {" "}
            8
          </button>
          <button
            onClick={() => handleButtonClick("9")}
            className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s"
          >
            {" "}
            9
          </button>
          <button
            onClick={() => handleButtonClick("*")}
            className="w-full h-full flex justify-center items-center text-2xl bg-calc_orange"
          >
            {" "}
            X
          </button>
          <button
            onClick={() => handleButtonClick("4")}
            className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s"
          >
            {" "}
            4
          </button>
          <button
            onClick={() => handleButtonClick("5")}
            className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s"
          >
            {" "}
            5
          </button>
          <button
            onClick={() => handleButtonClick("6")}
            className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s"
          >
            {" "}
            6
          </button>
          <button
            onClick={() => handleButtonClick("-")}
            className="w-full h-full flex justify-center items-center text-2xl bg-calc_orange"
          >
            {" "}
            -
          </button>
          <button
            onClick={() => handleButtonClick("1")}
            className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s"
          >
            {" "}
            1
          </button>
          <button
            onClick={() => handleButtonClick("2")}
            className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s"
          >
            {" "}
            2
          </button>
          <button
            onClick={() => handleButtonClick("3")}
            className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s"
          >
            {" "}
            3
          </button>
          <button
            onClick={() => handleButtonClick("+")}
            className="w-full h-full flex justify-center items-center text-2xl bg-calc_orange"
          >
            {" "}
            +
          </button>
          <button
            onClick={() => handleButtonClick("0")}
            className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s"
          >
            {" "}
            0
          </button>
          <button
            onClick={() => handleButtonClick(".")}
            className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s"
          >
            {" "}
            .
          </button>
          <button
            onClick={() => handleButtonClick("%")}
            className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s"
          >
            {" "}
            %
          </button>
          <button
            onClick={calculate}
            className="w-full h-full flex justify-center items-center text-2xl bg-calc_orange"
          >
            {" "}
            =
          </button>
        </div>
      )}

      {/* footer */}
      <div className="flex justify-between items-center w-full bg-calc_gray_l px-5 ">
        <TbArrowBackUp size={20} color="white" />
        <div className="flex flex-col items-center">
          <div className="text-calc_green">
            {formatDate(today) + "    " + formatTime(today)}
          </div>
          <div className="text-calc_gray_s">{`1${currencyStore.currencyFrom} = ${rate}${currencyStore.currencyTo}`}</div>
        </div>

        <GoInfo size={20} color="white" />
      </div>
    </div>
  )
})
export default index
