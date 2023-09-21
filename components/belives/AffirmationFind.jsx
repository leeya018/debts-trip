import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import AddDetails from "components/belives/AddDetails"
import axios from "axios"
import StandardButton from "ui/button/standard"
import Title from "ui/Title"
import LessInput from "ui/input/less"
import API, { askGpt } from 'api'

const AffirmationFind = observer(() => {
  const [belief, setBelief] = useState('');
  const [affirmations, setAffirmations] = useState([]);
  
  const generateAffirmations = async () => {
    if(!belief){
        return
    }
    const end = "( give me the affirmations in array, each one in each cell)" 
    const start = "give me 3 affirmations that for someone who wants to have the belivef of : "
    const question = `${start} ${belief} ${end}`;
    const res = await askGpt({
        question
      })
      console.log(res.data.message.content)
      setAffirmations(JSON.parse(res.data.message.content))
      
  }


  return (
    <div className="h-[100vh] w-screen bg-secondary flex flex-col  px-2">
      {/* <AddDetails /> */}
      <Title>Choose Belive</Title>
      <LessInput
       placeholder = "add belife"
       className = ""
       onChange = {(e) => setBelief(e.target.value)}
       value={belief}
       />
      <StandardButton onClick={generateAffirmations}>Generate Affirmations</StandardButton>
      <div>{setBelief}</div>
      <div>
        <ul className="flex flex-col gap-1">
        {affirmations.map((affirmation, key) => (
          <li key={key} className="" onClick={() => {}}>
            <div className="flex justify-between items-center bg-belief_blue text-white shadow-xl py-7 px-5">
              
              <div>{affirmation}</div>
            </div>
          </li>
        ))}
        </ul>
      </div>
    </div>
  )
})

export default AffirmationFind
