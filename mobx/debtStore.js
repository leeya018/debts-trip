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
  myList = []

  constructor() {
    makeAutoObservable(this)
    this.createGroup = this.createGroup.bind(this)
    this.joinGroup = this.joinGroup.bind(this)
    this.addProduct = this.addProduct.bind(this)
    this.getMyList = this.getMyList.bind(this)
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
            uid,
            items: [],
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

  async joinGroup(uid, groupId) {
    const docRef = doc(db, DB_CONNECTIONS.groups, groupId)
    console.log(docRef)
    // Fetch the document
    try {
      const docSnapshot = await getDoc(docRef)
      if (docSnapshot.exists()) {
        // Get the current value of the array field
        const users = docSnapshot.data().users

        updateDoc(docRef, {
          users: [
            ...users,
            {
              uid,
              items: [],
            },
          ],
        })
        return true
      }
      console.log("doc is not found")

      return false
    } catch (error) {
      console.error("Error updating document: ", error)
      messageStore.setError(error.message)
    }
  }

  async addProduct(uid, groupId, product) {
    const docRef = doc(db, DB_CONNECTIONS.groups, groupId)
    console.log(docRef)
    // Fetch the document

    try {
      const docSnapshot = await getDoc(docRef)
      if (docSnapshot.exists()) {
        // Get the current value of the array field
        let users = docSnapshot.data().users
        // let myProducts
        users.map((user) => {
          if (user.uid === uid) {
            user.items.push(product)
            this.myList.replace([...this.myList, product])
          }
          return user
        })
        await updateDoc(docRef, {
          users,
        })

        console.log("added items successfully")
        messageStore.setSuccess("added items successfully")
        return true
      } else {
        throw new Error("user list is not here ")
      }
    } catch (error) {
      console.error("Error adding item: ", error)
      messageStore.setError(error.message)
    }
  }

  async getMyList(uid, groupId) {
    const docRef = doc(db, DB_CONNECTIONS.groups, groupId)
    const docSnapshot = await getDoc(docRef)
    const users = docSnapshot.data().users
    const newList = users.find((user) => user.uid === uid)
    this.myList.replace(newList)
  }
}
export const debtStore = new Debt()
