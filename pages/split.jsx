import React from "react"
import Navbar from "components/site/nav"
import Footer from "components/Footer"
import { useLocation, useParams } from "react-router-dom"
export default function split() {
  return (
    <div className="h-[100vh] w-screen flex justify-center flex-col  ">
      <Navbar />
      split
      <Footer />
    </div>
  )
}
