import { makeAutoObservable } from "mobx"

class Belive {
  constructor() {
    makeAutoObservable(this)
  }

  setActiveNavItem = (navItem) => {
    this.activeNavItem = navItem
  }
}

export const beliveStore = new Belive()
