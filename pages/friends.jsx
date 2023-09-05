import React from "react"
import Nav from "../components/site/nav"
import Side from "../components/site/side"
import Content from "../components/site/content"
import Caegtories from "components/spanish/Word/words"

export default function index() {
  return (
    <div className="h-[100vh] w-screen bg-secondary flex  ">
      <Side />
      <div className="flex flex-col">
        <Nav />
        <Content />
      </div>
    </div>
  )
}
