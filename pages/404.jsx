import React from "react"
import { useRouter } from "next/router"

import Link from "next/link"
import Title from "ui/Title"

export default function notFound() {
  // const router = useRouter()

  return (
    <div className="h-[100vh] w-screen  flex flex-col justify-center items-center  gap-2">
      <Title>Page not found</Title>
      <Link href="/friends" className="text-lg underline text-blue-500">
        <span className="text-blue-500  hover:text-2xl">to friends</span>
      </Link>
      <Link href="/login" className="text-lg underline text-blue-500">
        <span className="text-blue-500  hover:text-2xl">to login</span>
      </Link>
      <Link href="/signup" className="text-lg underline text-blue-500">
        <span className="text-blue-500  hover:text-2xl">to signup</span>
      </Link>

      <Link href="/loginOption" className="text-lg underline text-blue-500">
        <span className="text-blue-500  hover:text-2xl">to loginOption</span>
      </Link>
      <Link href="/myList" className="text-lg underline text-blue-500">
        <span className="text-blue-500  hover:text-2xl">to myList</span>
      </Link>
    </div>
  )
}
