import { makeAutoObservable } from "mobx"

class Side {
  activeTab = ""

  constructor() {
    makeAutoObservable(this)
  }

  setActiveTab = (tab) => {
    this.activeTab = tab
  }
}

export const sideStore = new Side()
