import { makeAutoObservable, observable } from "mobx"

class Message {
  error = ""
  success = ""

  constructor() {
    makeAutoObservable(this)
  }

  setError = (value) => {
    this.error = value
    setTimeout(() => {
      this.error = ""
    }, 30000)
  }

  setSuccess = (value) => {
    this.success = value
    setTimeout(() => {
      this.success = ""
    }, 30000)
  }
}

export const messageStore = new Message()
