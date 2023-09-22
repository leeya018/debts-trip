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

export default function profile() {
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
        //set Imges
        const imagesArr = Object.values(userData.images)
        console.log(imagesArr)

        setImages(imagesArr)
      }
    })
  }
  const fetchUserData = async () => {
    const docRef = await addDoc(collection(db, "users"), {
      name: "user",
    })
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data())
    } else {
      console.log("No such document!")
    }
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
  return (
    <div>
      <Title>Profile</Title>
      <input
        id="imageFile"
        type="file"
        ref={inputFileRef}
        onChange={handleChange}
      />
      <StandardButton onClick={fetchUserData}>fetchUserData</StandardButton>
      <StandardButton onClick={upload}>upload</StandardButton>
      <div className="w-full border-2  m-2">
        <ul className="w-full grid grid-cols-3 gap-3 ">
          {images.map((image, key) => (
            <li key={key} className=" " onClick={() => {}}>
              <img className="shadow-2xl " src={image} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
