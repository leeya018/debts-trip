import axios from "axios"
import { getUrl } from "lib/util"
import { messageStore } from "mobx/messageStore"
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore"
import { db } from "./firebase"

import { userStore } from "mobx/userStore"

const url = getUrl()

const saveBelivesApi = async (beliefName, affirmations) => {
  const userRef = doc(db, "users", userStore.uid)

  const belief = {
    name: beliefName,
    affirmations,
  }

  // Update the user document by adding a new belief to the 'beliefs' array
  await updateDoc(userRef, {
    beliefs: arrayUnion(belief),
  })

  console.log(`Belief added for user with ID: ${userStore.uid}`)
}
const getBelivesApi = async () => {
  // Reference to the document in the 'users' collection
  const userRef = doc(db, "users", userStore.uid)

  // Fetch the document
  const userSnap = await getDoc(userRef)

  if (userSnap.exists()) {
    // User document data
    const userData = userSnap.data()
    return userData
  } else {
    // Handle the case where the document does not exist
    console.error("User does not exist")
    return null
  }
}
const askGptApi = async (body) => {
  try {
    const res = await axios.post(url + "/gpt", body, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log(res)
    return res
  } catch (error) {
    console.error("Error fetching user:", error)
  }
}

export { askGptApi, getBelivesApi, saveBelivesApi }
