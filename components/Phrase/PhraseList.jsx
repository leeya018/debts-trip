import { observer } from "mobx-react-lite"
import { categoryStore } from "mobx/categoryStore"
import React from "react"
import Category from "."
import Phrase from "."

const PhraseList = observer(({ phrases }) => {
  console.log("PhraseList")
  console.log({ phrases })

  return (
    <div className="grid grid-cols-5 gap-2 p-2">
      {phrases.map((p, key) => (
        // <Phrase key={key} phrase={p} />
        <div key={key}>{p.text + "-" + p.translation}</div>
      ))}
    </div>
  )
})

export default PhraseList
