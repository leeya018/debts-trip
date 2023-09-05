import AddPhrase from "components/Phrase/AddPhrase"
import PhraseList from "components/Phrase/PhraseList"
import { observer } from "mobx-react-lite"
import { categoryStore } from "mobx/categoryStore"
import React, { use, useState } from "react"
import Title from "ui/Title"

export const getServerSideProps = async (context) => {
  const { name } = context.query
  return {
    props: { name },
  }
}

const Category = observer(({ name }) => {
  console.log({ name })

  const chosenCategory = categoryStore.categories.find((c) => c.name === name)
  console.log({ chosenCategory })
  const phrases = chosenCategory?.phrases
  console.log({ phrases })
  return (
    <div>
      <Title>{chosenCategory.name} : </Title>
      <AddPhrase category={chosenCategory} />
      <div className="grid grid-cols-5 gap-2 p-2">
        {<PhraseList phrases={phrases} />}
      </div>
    </div>
  )
})

export default Category
