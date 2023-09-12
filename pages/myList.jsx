import AddItem from "components/AddItem"
import Navbar from "components/site/nav"
import Footer from "components/Footer"
import React, { useEffect, useState } from "react"
import Title from "ui/Title"
import { observer } from "mobx-react-lite"
import { debtStore } from "mobx/debtStore"
import { userStore } from "mobx/userStore"
import useLocalStorage from "hooks/useLocalStorage"
import Alerts from "components/Alerts"
import { DB_CONNECTIONS } from "lib/util"
import { collection, doc, onSnapshot, query } from "firebase/firestore"
import { db } from "../firebase"

const myList = observer(() => {
  const [gid, setGid] = useLocalStorage("gid")
  const [list, setList] = useState([])

  useEffect(() => {
    const gId = gid ?? debtStore.group.id

    const uid = userStore.uid
    // debtStore.getMyList(uid, gId)

    ///

    const docRef = doc(db, DB_CONNECTIONS.groups, gid)

    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        console.log("Document data:", doc.data())
        const user = doc.data().users.find((user) => user.uid === uid)
        setList(user.items)
      } else {
        console.log("No such document!")
      }
    })
    return unsubscribe
  }, [])

  return (
    <div className="h-[100vh] w-screen flex justify-center flex-col   ">
      <Navbar />
      <div className="w-80% mt-8">
        <Title>My List</Title>
        <AddItem />

        <ul>
          {list.map((product, key) => (
            <div key={key}>
              <div>{product.name}</div>
              <div>{product.price}</div>
              {/* <div>{product.currency}</div> */}
            </div>
          ))}
        </ul>
      </div>
      <Alerts />
      <Footer />
    </div>
  )
})
export default myList
