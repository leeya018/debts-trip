import { makeAutoObservable } from "mobx"

class Filter {
  affirmations = []
  isFocused = false
  belief = ""

  constructor() {
    makeAutoObservable(this)
  }
  setAffirmations = (value) => {
    this.affirmations = value
  }
  setIsFocused = (value) => {
    this.isFocused = value
  }
  setBelief = (value) => {
    this.belief = value
  }
}

export const filterStore = new Filter()
