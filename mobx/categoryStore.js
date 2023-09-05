import axios from "axios"
import { setToLocalStorage,getFromLocalStorage, createStick, getUrl, tokenItem } from "lib/util"
import { makeAutoObservable } from "mobx"
import { messageStore } from "./messageStore"

class Phrase {
  text = ""
  translation = ""

  constructor(text, translation) {
    this.text = text
    this.translation = translation
  }
}
class CategoryItem {
  id = ""
  name = ""
  phrases = []

  constructor(name) {
    this.id = Date.now().toString()
    this.name = name
    this.phrases = []
  }
  addPhrase({ text, translation }) {
    this.phrases.push(new Phrase(text, translation))
    console.log(this.phrases)
  }
}

class Category {
  categories = []
  selectedCategory = null
  selectedWord = null

  constructor() {
    makeAutoObservable(this)
    this.addCategory = this.addCategory.bind(this)
  }

  addCategory(name) {
    this.categories.push(new CategoryItem(name))
  }

  setSelectedCategory = (category) => {
    this.selectedCategory = category
    return setToLocalStorage('category',category)
    
  }
  getSelectedCategory = () => {
    if(this.selectedCategory) return this.selectedCategory
    return getFromLocalStorage('category')
  }
  setSelectedWord = (w) => {
    this.selectedWord = w
    console.log({ selectedWord: this.selectedWord })
  }
}


export const categoryStore = new Category()
