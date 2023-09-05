import { makeAutoObservable } from "mobx"

class Modal {
  modalName = ""

  constructor() {
    makeAutoObservable(this)
    this.closeModal = this.closeModal.bind(this)
    this.openModal = this.openModal.bind(this)

  }

  closeModal = () => {
    this.modalName = ""
  }
  openModal = (name) => {
    this.modalName = name
  }
}

export const modalStore = new Modal()
