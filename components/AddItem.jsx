import useLocalStorage from "hooks/useLocalStorage"
import { observer } from "mobx-react-lite"
import { categoryStore } from "mobx/categoryStore"
import LessInput from "ui/input/less"
import { useEffect, useState } from "react"
import StandardButton from "ui/button/standard"
import { debtStore } from "mobx/debtStore"

const AddItem = observer(() => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [gid] = useLocalStorage("gid")

  const add = () => {
    const gId = gid ?? debtStore.group.id
    debtStore.addProduct(debtStore.uid, gId, {
      name,
      price,
    })
  }
  return (
    <div className="w-full flex flex-col items-center">
      <LessInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-30"
        placeholder="add name"
      />
      <LessInput
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-30"
        placeholder="add setPrice"
      />
      <StandardButton className="bg-blueL" variant="primary" onClick={add}>
        Add Item
      </StandardButton>{" "}
    </div>
  )
})

export default AddItem
