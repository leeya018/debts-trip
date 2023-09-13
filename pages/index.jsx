import React from "react"

import { useRouter } from "next/router"

import { useEffect } from "react"
import Image from "next/image"

export default function index() {
  const router = useRouter()

  return (
    <div className="h-[100vh] w-screen bg-fa_back flex flex-col">
      <div className="h-[100vh] w-screen text-black flex justify-center gap-20 bg-fa_back pt-[72px] pb-[112px]">
        <div>
          <div className="h-44 flex items-end">
            <Image
              className="border-2 border-black mr-2  w-80 h-28 relative -translate-x-8"
              src={"https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"}
              alt="facebook"
              height={50}
              width={50}
            />
          </div>
          <div className="w-[500px] h-[64px] text-2xl">
            Connect with friends and the world
            <br /> around you on Facebook.
          </div>
        </div>
        {/* second */}
        <div className="flex flex-col ">
          <div className="w-396px h-[349px] bg-white p-5 flex flex-col pb-7 pt-5 gap-3 ">
            <input
              type="text"
              className="rounded-md  bg-fa_blue_in w-full py-[14px] px-[16px] ring text-xl"
            />
            <input
              type="password"
              className="rounded-md  bg-fa_blue_in w-full py-[14px] px-[16px] ring"
            />
            <button className="rounded-lg bg-fa_blue_b text-white font-bold flex justify-center items-center h-24 text-xl  ">
              Log In
            </button>
            <div className="text-fa_blue_l mb-8 flex justify-center">
              Forgot password?
            </div>
            <button className="rounded-md bg-fa_green text-white font-bold flex justify-center items-center  h-24 text-xl ">
              Create new account
            </button>
          </div>
          <div>Create a Page for a celebrity, brand or business.</div>
        </div>
      </div>
      <div>english baalahak</div>
    </div>
  )
}
