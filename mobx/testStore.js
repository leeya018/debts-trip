import { NavItems, SHOWS } from "lib/util"
import { makeAutoObservable } from "mobx"
import { messageStore } from "./messageStore"
import { getUrl, getbaseAxios, tokenItem } from "lib/util"

class Test {
  isShowWords = false
  categories = []
  words = []
  showMode = SHOWS.all

  constructor() {
    makeAutoObservable(this)
    this.getAllCats = this.getAllCats.bind(this)
  }

  setShowMode = (showMode) => {
    this.showMode = showMode
  }

  setIsShowWords = (isShow) => {
    this.isShowWords = isShow
  }
  setWords = (category) => {
    this.words = category.words
  }

  async getAllCats() {
    try {
      const response = await getbaseAxios().get("/api/categories/test")
      console.log(response.data)
      console.log(this)

      this.categories = response.data // This will be the user object returned from your API
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching user:", error)
      if (error.response?.status === 401) {
        messageStore.setError("You are not authorized")
      }
    }
  }
}

export const testStore = new Test()
