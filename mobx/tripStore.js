import { NavItems, SHOWS } from "lib/util"
import { makeAutoObservable } from "mobx"

class Trip {
  budget = 0
  location = null
  family = null
  result = ""

  constructor() {
    makeAutoObservable(this)
  }

  setBudget = (budget) => {
    this.budget = budget
  }
  setLocation = (location) => {
    this.location = location
  }
  setFamily = (family) => {
    this.family = family
  }
  setResult = (result) => {
    this.result = result
  }
}

export const tripStore = new Trip()
