import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../firebase"
import axios from "axios"
import { getUrl, getbaseAxios, tokenItem } from "lib/util"
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
  }

  resetUserStore() {}

  async createGroup(name, uid) {
    try {
      // Set the document
      const docRef = await addDoc(collection(db, "groups"), {
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
      messageStore.setSuccess("Category added successfully")
      return docSnapshot
    } catch (error) {
      console.log(error.message)
      messageStore.setError(error.message)
    }
  }
}
export const debtStore = new Debt()
