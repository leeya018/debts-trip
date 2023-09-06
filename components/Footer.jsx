import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { PATH_NAMES } from "lib/util"
import { useRouter } from "next/router"
import { useParams } from "react-router-dom"

const Footer = observer(() => {
  const [currPath, setCurrPath] = useState("")
  const router = useRouter()

  useEffect(() => {
    const path = window.location.pathname
    setCurrPath(path)
    // rest of your logic
  }, [])

  const isSamePage = (path) => {
    return currPath?.toLocaleLowerCase().includes(path.toLocaleLowerCase())
  }
  return (
    <div
      className="absolute bg-white z-50 bottom-0 left-0 right-0 
      w-[100vw]
     flex  h-30 border-2 justify-around items-center  gap-8"
    >
      {!isSamePage(PATH_NAMES.split) && (
        <div onClick={() => router.push(PATH_NAMES.split)}> Split</div>
      )}
      {!isSamePage(PATH_NAMES.myList) && (
        <div onClick={() => router.push(PATH_NAMES.myList)}>My List</div>
      )}
      {!isSamePage(PATH_NAMES.friends) && (
        <div onClick={() => router.push(PATH_NAMES.friends)}>My Friends</div>
      )}
    </div>
  )
})

export default Footer
