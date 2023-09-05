import React, { useState } from "react"
import Item from "./Item"
import AirplayIcon from "@mui/icons-material/Airplay"
import Person2Icon from "@mui/icons-material/Person2"
import { NavItems, parseJwt } from "lib/util"
import { Button } from "react-bootstrap"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "../../../firebase"
import { useRouter } from "next/router"
import { userStore } from "mobx/userStore"
import { tokenItem } from "lib/util"
import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import Image from "next/image"
import { navStore } from "mobx/navStore"
import { spanishStore } from "mobx/spanishStore"
import { signOut } from "firebase/auth"
import { categoryStore } from "mobx/categoryStore"

const Nav = observer(() => {
  const { setLoginUser, setToken, getToken } = userStore
  const { activeNavItem, setactiveNavItem } = navStore
  const router = useRouter()

  useEffect(() => {
    const newToken = getToken()
    if (newToken) {
      setToken(newToken)
      const user = parseJwt(newToken)
      const newUser = {
        photoURL: user.picture,
        displayName: user.name,
        uid: user.user_id,
      }
      setLoginUser(newUser)
      console.log({ user })
    }
  }, [getToken, setLoginUser])

  const login = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const someToken = credential.accessToken
        // console.log(token)

        // The signed-in user info.
        const user = result.user
        console.log(user)
        setToken(user.accessToken)
        console.log(user.photoURL)
        console.log(user.displayName)
        console.log(user.uid)
        setLoginUser(user)
        spanishStore.addUser(user.uid, user.displayName)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The email of the user's account used.
        const email = error.customData.email
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        // ...
      })
  }

  const logout = () => {
    signOut(auth)
    setToken("")
    userStore.resetLoginUser()
    categoryStore.setSelectedCategory(null)
    spanishStore.resetUserStore()
  }


  const getProfileImage = () => {
    if (userStore.photoURL) {
      return (
        <div className="flex gap-2 p-2 absolute top-0 right-0  items-center">
          <div>{userStore.displayName}</div>
          <div>
            <Image
              src={userStore.photoURL}
              alt="no data"
              height={50}
              width={50}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div className="flex gap-2 p-2 absolute top-0 right-0  ">
          <Person2Icon
            className="w-10 h-10   ml-auto cursor-pointer"
            onClick={login}
          />
          div
        </div>
      )
    }
  }

  const clickNav = (navLink) => {
    setactiveNavItem(navLink)
    categoryStore.setSelectedCategory('')
     
  }
  return (
    <div className="h-[10vh] bg-white flex justify-end gap-2 sticky border-b-[.5px]">
      <Item
        text={"Add Category"}
        name={NavItems.categories}
        onClick={() => clickNav(NavItems.categories)}
    
      />
      <Item
        isActive={categoryStore.getSelectedCategory()}
        text={"Learn Spanish"}
        name={NavItems.words}
        
        onClick={() => clickNav(NavItems.words)}
    
      />
      <Item
        text={"Test"}
        name={NavItems.test}
        onClick={() => clickNav(NavItems.test)}
    
      />
      <Item
        text={"Pay Premium "}
        name={NavItems.prem}
        onClick={() => clickNav(NavItems.prem)}
    
      />
      <Item
        text={"About"}
        name={NavItems.about}
        onClick={() => clickNav(NavItems.about)}
    
      />
      <Item
        text={"Logout"}
        name={NavItems.logout}
        onClick={logout}
    
      />

      <div className="px-10 py-2 ml-5 flex justify-center items-center">
        {getProfileImage()}
      </div>
    </div>
  )
})
export default Nav
