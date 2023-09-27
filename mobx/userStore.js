import axios from "axios"
import { getUrl } from "lib/util"
import { makeAutoObservable } from "mobx"

class User {
  photoURL = ""
  displayName = ""
  uid = ""
  token = ""
  believes = {}

  constructor() {
    makeAutoObservable(this)
    this.loadState()
  }

  setBelief(value) {
    this.belief = value
  }

  setDisplayName(value) {
    this.displayName = value
  }
  loadState() {
    if (typeof window !== "undefined" && window.localStorage) {
      const user = window.localStorage.getItem("user")
      if (user !== null && user !== undefined) {
        this.photoURL = JSON.parse(user).photoURL
        this.displayName = JSON.parse(user).displayName
        this.uid = JSON.parse(user).uid
        this.token = JSON.parse(user).token
        console.log("loadState => " + this.displayName)
      }
    }
  }

  saveState() {
    console.log("saveState")
    if (typeof window !== "undefined" && window.localStorage) {
      const user = {
        photoURL: this.photoURL,
        displayName: this.displayName,
        uid: this.uid,
        token: this.token,
      }
      window.localStorage.setItem("user", JSON.stringify(user))
    }
  }

  setLoginUser = (user) => {
    this.photoURL = user.photoURL
    this.displayName = user.displayName
    this.uid = user.uid
  }
  resetLoginUser = () => {
    this.photoURL = ""
    this.displayName = ""
    this.uid = ""
  }

  hasToken = () => {
    return this.token !== undefined && this.token
  }

  setToken = (newToken) => {
    this.token = newToken
  }
  removeToken = () => {
    localStorage.removeItem("token")
  }
  checkTokenValid = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    }
    try {
      await axios.get(getUrl() + "/api/validate", config)
      console.log("TOKEN VALID")
    } catch (error) {
      throw new Error("token is not valid")
    }
  }
}

export const userStore = new User()
