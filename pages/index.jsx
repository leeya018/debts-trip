import React from "react"

import { useRouter } from "next/router"
import Image from "next/image"

import { useEffect } from "react"
// import israel from "images/isral.png"
// import us from "/images/us.png"
import { BiArrowBack } from "react-icons/bi"
import { HiMiniArrowsUpDown } from "react-icons/hi"
import { GoInfo } from "react-icons/go"
import { TbArrowBackUp } from "react-icons/tb"
export default function index() {
  const router = useRouter()

  useEffect(() => {}, [])

  return (
    <div className="h-[100vh] w-screen bg-secondary flex flex-col  text-calc_white  ">
      {/* source currency */}
      <div className="h-36 flex justify-between items-center px-5">
        <div className="flex flex-col justify-center items-center">
          <Image
            className="mr-2 rounded-full mb-2"
            src={
              "https://media.istockphoto.com/id/594943272/vector/flag-of-israel.jpg?s=612x612&w=0&k=20&c=tAyp5fbehAZIHmS0MmMXZT7dOw24uCA1YR-sg50fEfI="
            }
            alt="israel"
            height={50}
            width={50}
          />
          <div>isr</div>
        </div>
        <input type="text" className="flex w-full h-full bg-calc_gray_l" />
      </div>
      {/* target currency */}
      <div className="h-36 flex justify-between items-center px-5">
        <div className="flex flex-col justify-center items-center">
          <Image
            className="mr-2 rounded-full mb-2"
            // src={
            //   "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png"
            // }
            alt="israel"
            height={50}
            width={50}
          />
          <div>us</div>
        </div>
        <input type="text" className="flex w-full h-full bg-calc_gray_l" />
      </div>
      {/* calculator */}
      <div className="flex-1 h-full grid grid-cols-4 grid-rows-4 ">
        <button className="w-full h-full flex justify-center items-center text-2xl">
          {" "}
          C
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl">
          {" "}
          <BiArrowBack />
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl">
          {" "}
          <HiMiniArrowsUpDown />
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl">
          {" "}
          /
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl">
          {" "}
          7
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl">
          {" "}
          8
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl">
          {" "}
          9
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl">
          {" "}
          X
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl">
          {" "}
          4
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl">
          {" "}
          5
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl">
          {" "}
          6
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl">
          {" "}
          -
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl">
          {" "}
          1
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl">
          {" "}
          2
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl">
          {" "}
          3
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl">
          {" "}
          -
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl">
          {" "}
          0
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl">
          {" "}
          .
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl">
          {" "}
          %
        </button>
        <button className="w-full h-full flex justify-center items-center text-2xl">
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
