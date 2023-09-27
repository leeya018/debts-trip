import axios from "axios"
import { getUrl } from "lib/util"
import { makeAutoObservable } from "mobx"

class Belief {
  belief = ""
  constructor() {
    makeAutoObservable(this)
    this.loadState()
  }

  setBelief(value) {
    this.belief = value
  }

  loadState() {
    if (typeof window !== "undefined" && window.localStorage) {
      const belief = window.localStorage.getItem("belief")
      if (belief !== null && belief !== undefined) {
        this.belief = JSON.parse(belief).belief
        console.log("loadState => " + this.belief)
      }
    }
  }

  saveState() {
    console.log("saveState")
    if (typeof window !== "undefined" && window.localStorage) {
      const belief = {
        belief: this.belief,
      }
      window.localStorage.setItem("belief", JSON.stringify(belief))
    }
  }
}

export const beliefStore = new Belief()
