import React, { useEffect, useState } from "react"

import { useRouter } from "next/router"
import { NavItems } from "lib/util"
import { navStore } from "mobx/navStore"
import { observer } from "mobx-react-lite"
import Image from "next/image"
const dataArray = [
  {
    name: "John Doe",
    imageUrl:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    messages: ["Hi", "How are you?", "See you soon"],
    date: "2023-09-18",
  },
  {
    name: "Jane Smith",
    imageUrl:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    messages: ["Hello", "Good day!"],
    date: "2023-09-17",
  },
  {
    name: "Jane Smith",
    imageUrl:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    messages: ["Hello", "Good day!"],
    date: "2023-09-17",
  },
  {
    name: "Jane Smith",
    imageUrl:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    messages: ["Hello", "Good day!"],
    date: "2023-09-17",
  },
  {
    name: "Jane Smith",
    imageUrl:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    messages: ["Hello", "Good day!"],
    date: "2023-09-17",
  },
  {
    name: "Jane Smith",
    imageUrl:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    messages: ["Hello", "Good day!"],
    date: "2023-09-17",
  },
  {
    name: "Jane Smith",
    imageUrl:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    messages: ["Hello", "Good day!"],
    date: "2023-09-17",
  },
  {
    name: "Jane Smith",
    imageUrl:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    messages: ["Hello", "Good day!"],
    date: "2023-09-17",
  },
  {
    name: "Jane Smith",
    imageUrl:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    messages: ["Hello", "Good day!"],
    date: "2023-09-17",
  },
  {
    name: "Jane Smith",
    imageUrl:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    messages: ["Hello", "Good day!"],
    date: "2023-09-17",
  },
]

const Messages = observer(() => {
  const router = useRouter()

  const handleClick = (name) => {
    navStore.setActiveNavItem(name)
    // router.push(NavItems.updates)
  }
  console.log(navStore.activeNavItem)
  return (
    <div
      className="w-full flex-1 
    flex justify-between items-center  py-2  text-whats_gray_t"
    >
      <ul className="w-full scroll-auto overflow-y-auto h-[25rem]">
        {dataArray.map((data, key) => {
          return (
            <Message
              key={key}
              name={data.name}
              image={data.imageUrl}
              messages={data.messages}
              hour={data.date}
              onClick={() => handleClick(NavItems.updates)}
            />
          )
        })}
      </ul>
    </div>
  )
})
export default Messages

function Message({ name, image, messages, hour }) {
  return (
    <div
      className="flex  justify-between border-t-2 py-2"
      // onClick={onClick}
    >
      <div className="flex gap-2">
        <Image
          className=" rounded-full "
          src={image ?? ""}
          alt="no data"
          height={50}
          width={50}
        />
        <div className="flex flex-col justify-center items-start">
          <div>{messages[messages.length - 1]}</div>
          <div>{name}</div>
        </div>
      </div>
      <div>{hour}</div>
    </div>
  )
}
