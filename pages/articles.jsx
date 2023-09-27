import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { beliefStore } from "mobx/beliefStore"
import { asyncStore } from "mobx/asyncStore"
import { userStore } from "mobx/userStore"
import { askGptApi } from "api"

const articles = observer(() => {
  const generateArticle = async () => {
    if (!beliefStore.belief || asyncStore.isLoading) {
      return
    }

    const question = `generate an article with a title and 1 paragraph for a user name: ${userStore.displayName} which have the belife of : ${beliefStore.belief}. I want that the arcitle will look like he allready achive it or something on the way there .`

    try {
      asyncStore.setIsLoading(true)
      const res = await askGptApi({
        question,
      })
      asyncStore.setIsLoading(false)
      console.log(res.data.message.content)
      setAffirmations(JSON.parse(res.data.message.content))
    } catch (error) {
      asyncStore.setIsLoading(false)
      console.log(error)
    }
  }
  return (
    <div className="h-[100vh] w-screen bg-secondary flex flex-col  px-2">
      <div>articles</div>
      <button>show article</button>
      <button onClick={generateArticle}>generateArticle</button>
      <div>{}</div>
    </div>
  )
})

export default articles
