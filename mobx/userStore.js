import axios from "axios"
import { getUrl, tokenItem } from "lib/util"
import { makeAutoObservable } from "mobx"

class User {
  photoURL = ""
  displayName = ""
  uid = ""
  token = ""
  constructor() {
    makeAutoObservable(this)
  }

  setLoginUser = (user) => {
    this.photoURL = user.photoURL
    this.displayName = user.displayName
    this.uid = user.uid
  }
  resetLoginUser = () => {
    this.photoURL = ""
    this.displayName = ''
    this.uid = ''
  }

  hasToken = () => {
    const token = this.getToken()
    token !== null && token !== undefined && token !== ""
  }

  getToken = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        return localStorage.getItem(tokenItem)
      } catch (e) {
        console.warn("Failed to retrieve from localStorage:", e)
        return null
      }
    }
  }

  setToken = (newToken) => {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        localStorage.setItem(tokenItem, newToken)
        this.token = newToken
      } catch (e) {
        console.warn("Failed to save to localStorage:", e)
      }
    }
  }
  removeToken = () => {
    localStorage.removeItem(tokenItem)
  }
  checkTokenValid = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getToken()}`,
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
