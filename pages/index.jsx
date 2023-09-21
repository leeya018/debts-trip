import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import AddDetails from "components/belives/AddDetails"
import AffirmationFind from "components/belives/AffirmationFind"
import axios from "axios"
import ColoredText from "components/belives/ColoredText"

const index = observer(() => {
  const [message, setMessage] = useState('');
  
  const generateMessage = async () => {
 
  }


  return (
    <div className="h-[100vh] w-screen bg-secondary flex flex-col  px-2">
      {/* AddDetails */}
      
      <AffirmationFind />
    </div>
  )
})

export default index



