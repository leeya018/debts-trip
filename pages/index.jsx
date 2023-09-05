import React from "react"

import { useRouter } from "next/router"

import { useEffect } from "react"

export default function index() {
  const router = useRouter()

  useEffect(() => {
    router.push(`/loginOption`)
  }, [])

  return <div className="h-[100vh] w-screen bg-secondary flex  "></div>
}
