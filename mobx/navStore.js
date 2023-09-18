import { NavItems, SHOWS } from "lib/util"
import { makeAutoObservable } from "mobx"

class Nav {
  activeNavItem = NavItems.test

  constructor() {
    makeAutoObservable(this)
  }

  setActiveNavItem = (navItem) => {
    this.activeNavItem = navItem
  }
}

export const navStore = new Nav()
