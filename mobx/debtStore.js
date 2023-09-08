import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore"
import { db } from "../firebase"
import axios from "axios"
import { DB_CONNECTIONS, getUrl, getbaseAxios, tokenItem } from "lib/util"
import { makeAutoObservable } from "mobx"
import { messageStore } from "./messageStore"

class Debt {
  user = ""
  success = ""
  baseAxios = null
  group = null

  constructor() {
    makeAutoObservable(this)
    this.createGroup = this.createGroup.bind(this)
    this.joinGroup = this.joinGroup.bind(this)
  }

  resetUserStore() {}

  async createGroup(name, uid) {
    try {
      // Set the document
      const docRef = await addDoc(collection(db, DB_CONNECTIONS.groups), {
        name,
        admin: uid,
        users: [
          {
            [uid]: [],
          },
        ],
        created_date: new Date(),
      })

      // Get the document
      console.log("Get the document")

      const docSnapshot = await getDoc(docRef)

      console.log(docSnapshot)
      console.log(docSnapshot.id, docSnapshot.data())
      const [id, data] = [docSnapshot.id, docSnapshot.data()]
      this.group = { id, ...data }
      console.log(this.group)
      messageStore.setSuccess("Group created successfully")
      return docSnapshot
    } catch (error) {
      console.log(error.message)
      messageStore.setError(error.message)
    }
  }

  joinGroup(uid, groupId) {
    const docRef = doc(db, DB_CONNECTIONS.groups, groupId)
    console.log(docRef)
    // Fetch the document
    getDoc(docRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          // Get the current value of the array field
          const users = docSnapshot.data().users

          // Add a new item to the array

          // Update the document with the new array
          return updateDoc(docRef, {
            users: [...users, { [uid]: [] }],
          })
        } else {
          console.log("No such document!")
        }
      })
      .then(() => {
        console.log("Document successfully updated!")
      })
      .catch((error) => {
        console.error("Error updating document: ", error)
      })
  }
}
export const debtStore = new Debt()
