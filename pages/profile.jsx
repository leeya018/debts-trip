import React, { useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import Title from "ui/Title"
import { userStore } from "mobx/userStore"
import { db, storage } from "../firebase"

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import StandardButton from "ui/button/standard"
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore"
import { currencyStore } from "mobx/currencyStore"
import Image from "next/image"
import LessInput from "ui/input/less"
import { beliefStore } from "mobx/beliefStore"

const profile = observer(() => {
  const metadata = {
    contentType: "image/jpeg",
  }
  const [file, setFile] = useState(null)
  const [images, setImages] = useState([])
  const inputFileRef = useRef(null)
  const imageFile = inputFileRef.current?.files[0]
  const imagePath = `users/${userStore.uid}/${imageFile?.name}`

  const storageRef = ref(storage, imagePath)
  useEffect(() => {
    getMyImages()
  }, [])

  const getMyImages = async () => {
    getDoc(doc(db, "users", userStore.uid)).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data()
        console.log("User's images:", userData.images)
        beliefStore.setBelief(userData.belief)
        userStore.setDisplayName(userData.displayName)
        //set Imges
        const imagesArr = Object.values(userData.images)
        console.log(imagesArr)

        setImages(imagesArr)
      }
    })
  }

  const upload = () => {
    console.log("Upload file!", storageRef)
    console.log("Upload file!1", imageFile)

    uploadBytes(storageRef, imageFile, metadata)
      .then((snapshot) => {
        return getDownloadURL(storageRef)
      })
      .then((downloadURL) => {
        console.log(`File available at: ${downloadURL}`, db)
        console.log({ uid: userStore.uid })
        const imageRef = doc(db, "users", userStore.uid)
        console.log(downloadURL, userStore.uid, imageRef)
        return setDoc(
          imageRef,
          {
            images: {
              [imageFile.name]: downloadURL,
            },
          },
          { merge: true }
        )
      })
      .then(() => {
        // After saving the downloadURL to the database, now fetch the images
        getMyImages()
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const handleChange = (e) => {
    console.log(e.target.files)
    setFile(URL.createObjectURL(e.target.files[0]))
  }
  const save = async (e) => {
    try {
      const userRef = doc(db, "users", userStore.uid)
      await setDoc(
        userRef,
        {
          belief: beliefStore.belief,
          displayName: userStore.displayName,
        },
        { merge: true }
      )

      // Fetch the new data
      const docSnap = await getDoc(userRef)

      // Check if the document exists and return the data
      if (docSnap.exists()) {
        return docSnap.data()
      } else {
        throw new Error("Document does not exist")
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="">
      <Title>Profile</Title>
      <input
        id="imageFile"
        type="file"
        ref={inputFileRef}
        onChange={handleChange}
      />
      <StandardButton onClick={upload}>upload</StandardButton>
      <LessInput
        placeholder="display name"
        className="w-full"
        onChange={(e) => userStore.setDisplayName(e.target.value)}
        value={userStore?.displayName}
      />
      <LessInput
        placeholder="add belife"
        className="w-full"
        onChange={(e) => beliefStore.setBelief(e.target.value)}
        value={beliefStore?.belief}
      />
      <StandardButton onClick={save}>save</StandardButton>

      <div className="w-full border-2 m-2 ">
        {/* <div>{beliefStore.belief}</div> */}
        <ul className="w-full grid grid-cols-3 gap-3 overflow-y-auto overflow-scroll">
          {images.map((image, key) => (
            <li key={key} className=" " onClick={() => {}}>
              <img className="shadow-2xl  w-60 h-60" src={image} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
})
export default profile
