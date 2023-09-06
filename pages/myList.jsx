import AddItem from "components/AddItem"
import Navbar from "components/site/nav"
import Footer from "components/Footer"
import React from "react"
import Title from "ui/Title"

export default function myList() {
  return (
    <div className="h-[100vh] w-screen flex justify-center flex-col   ">
      <Navbar />
      <div className="w-80% mt-8">
        <Title>My List</Title>
        <AddItem />
      </div>
      <Footer />
    </div>
  )
}
{
  /* <ul className="flex flex-col gap-2">
          {spanishStore?.words?.map((w, key) => (
            <Word word={w} key={key} />
          ))}
        </ul> */
}
