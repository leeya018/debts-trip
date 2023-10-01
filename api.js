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
    return userData.beliefs
  } else {
    // Handle the case where the document does not exist
    console.error("User does not exist")
    return null
  }
}
const getArticlesApi = async () => {
  // Reference to the document in the 'users' collection
  const userRef = doc(db, "users", userStore.uid)

  // Fetch the document
  const userSnap = await getDoc(userRef)

  if (userSnap.exists()) {
    // User document data
    const userData = userSnap.data()
    return userData.articles
  } else {
    // Handle the case where the document does not exist
    console.error("User does not exist")
    return null
  }
}
const addArticlesApi = async (article) => {
  // const { belief, images, title, text, myImage } = article
  const userRef = doc(db, "users", userStore.uid)

  // Update the user document by adding a new belief to the 'beliefs' array
  await updateDoc(userRef, {
    articles: arrayUnion(article),
  })
}
const getArticleImagesApi = async (searchTxt) => {
  try {
    const res = await axios.post(
      url + "/lexica",
      { searchTxt },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    console.log("getArticleImagesApi")
    console.log(res)
    return res.data.images
  } catch (error) {
    console.error("Error fetching user:", error)
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

const getMyImagesApi = async () => {
  const docSnapshot = await getDoc(doc(db, "users", userStore.uid))
  if (docSnapshot.exists()) {
    const userData = docSnapshot.data()
    console.log("User's images:", userData.images)
    return Object.values(userData.images)
  }
  return []
}

export {
  addArticlesApi,
  getMyImagesApi,
  askGptApi,
  getBelivesApi,
  saveBelivesApi,
  getArticlesApi,
  getArticleImagesApi,
}
