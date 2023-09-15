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
import Freecurrencyapi from "@everapi/freecurrencyapi-js"
import { currencyStore } from "mobx/currencyStore"
const freecurrencyapi = new Freecurrencyapi(
  "fca_live_Z1uEV83RkRvjDiDl3CF2a0vTC5JH2OZ72YMnbRyo"
)
export default function index() {
  const router = useRouter()
  const [amount, setAmount] = useState(100)
  const [result, setResult] = useState("")

  useEffect(() => {
    freecurrencyapi
      .latest({
        base_currency: currencyStore.currencyFrom,
        currencies: currencyStore.currencyTo,
      })
      .then((response) => {
        console.log(response)
        const rate = response.data[currencyStore.currencyTo]
        setResult(rate * amount)
      })
  }, [amount])

  return (
    <div className="h-[100vh] w-screen bg-secondary flex flex-col  text-calc_white  ">
      {/* source currency */}
      <div className="h-36 flex justify-between items-center px-5 bg-calc_gray_l ring-0">
        <div className="flex flex-col justify-center items-center ">
          <Image
            className=" rounded-full w-12 h-12"
            src={us.src}
            alt="israel"
            height={50}
            width={50}
          />
          <div>us</div>
        </div>
        <input
          type="number"
          value={amount}
          onChange={(e) => {
            setAmount((prev) => {
              if (prev) {
                return e.target.value
              }
              return 0
            })
          }}
          className="flex w-full h-full bg-calc_gray_l"
        />
      </div>
      {/* target currency */}
      <div className="h-36 flex justify-between  items-center px-5 bg-calc_gray_l ring-0">
        <div className="flex flex-col justify-center items-center">
          <Image
            className="mr-2 rounded-full mb-2"
            // src={
            //   "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png"
            // }
            src={is.src}
            alt="israel"
            height={50}
            width={50}
          />
          <div>us</div>
        </div>
        <input
          type="text"
          value={result}
          className="flex w-full h-full bg-calc_gray_l"
        />
      </div>
      {/* calculator */}
      <div className="flex-1 h-full grid grid-cols-4 grid-rows-4 ">
        <button className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_m">
          {" "}
          C
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_m">
          {" "}
          <BiArrowBack size={20} color="white" />
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_m">
          {" "}
          <RiArrowUpDownFill size={20} color="white" />
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl bg-calc_orange">
          {" "}
          /
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s">
          {" "}
          7
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s">
          {" "}
          8
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s">
          {" "}
          9
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl bg-calc_orange">
          {" "}
          X
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s">
          {" "}
          4
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s">
          {" "}
          5
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s">
          {" "}
          6
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl bg-calc_orange">
          {" "}
          -
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s">
          {" "}
          1
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s">
          {" "}
          2
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s">
          {" "}
          3
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl bg-calc_orange">
          {" "}
          -
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s">
          {" "}
          0
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s">
          {" "}
          .
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl bg-calc_gray_s">
          {" "}
          %
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl bg-calc_orange">
          {" "}
          =
        </button>
      </div>

      {/* footer */}
      <div className="flex justify-between items-center w-full ">
        <TbArrowBackUp />
        <div className="text-calc_green">{"19/05/23" - "14:25"}</div>
        <div className="text-calc_gray_s">{"1ls =0.2356 USD"}</div>

        <GoInfo />
      </div>
    </div>
  )
}
