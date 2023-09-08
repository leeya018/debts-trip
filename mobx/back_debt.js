import { doc, setDoc } from "firebase/firestore"
import axios from "axios"
import { getUrl, getbaseAxios, tokenItem } from "lib/util"
import { makeAutoObservable } from "mobx"
import { messageStore } from "./messageStore"

class Debt {
  user = ""
  categories = []
  words = []
  success = ""
  baseAxios = null

  constructor() {
    makeAutoObservable(this)
    this.getUser = this.getUser.bind(this)
    this.resetUserStore = this.resetUserStore.bind(this)
    this.addUser = this.addUser.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.createGroup = this.createGroup.bind(this)
    this.deleteCategory = this.deleteCategory.bind(this)
    this.getItems = this.getItems.bind(this)
    this.addItem = this.addItem.bind(this)
    this.removeWord = this.removeWord.bind(this)
    this.editCategory = this.editCategory.bind(this)
    this.editWord = this.editWord.bind(this)
  }

  resetUserStore() {
    this.user = ""
    this.words = []
  }

  async editWord(categoryId, wordId, word, plusCount = 0) {
    try {
      const response = await getbaseAxios().put(
        `/api/words/${wordId}`,
        { word, plusCount },
        {
          params: {
            categoryId,
          },
        }
      )

      console.log(response.data)
      const updatedStick = response.data
      this.words = [...this.words].map((st) => {
        if (st._id === updatedStick._id) {
          return updatedStick
        }
        return st
      })
      messageStore.setSuccess("Stick updated successfully")
    } catch (error) {
      console.error("Error fetching user:", error)
      messageStore.setError("Failed updating wordssssss")

      if (error.response) {
        // The request was made and the server responded with a status code outside of the range of 2xx
        console.error("Server response:", error.response.data)
      }
      if (error.response?.status === 401) {
        messageStore.setError("You are not authorized")
      }
    }
  }

  async editCategory(id, name) {
    try {
      const response = await getbaseAxios().put(`/api/categories/${id}`, {
        name,
      })

      console.log(response.data)
      const updatedCategory = response.data
      this.categories = [...this.categories].map((st) => {
        if (st._id === updatedCategory._id) {
          return updatedCategory
        }
        return st
      })
      messageStore.setSuccess("Stick updated successfully")
    } catch (error) {
      console.error("Error fetching user:", error)
      messageStore.setError("Failed updating wordssssss")

      if (error.response) {
        // The request was made and the server responded with a status code outside of the range of 2xx
        console.error("Server response:", error.response.data)
      }
      if (error.response?.status === 401) {
        messageStore.setError("You are not authorized")
      }
    }
  }
  async removeWord(categoryId, wordId) {
    try {
      const response = await getbaseAxios().delete(`/api/words/${wordId}`, {
        params: {
          categoryId,
        },
      })

      console.log(response.data)
      const removedStickId = response.data
      this.words = [...this.words].filter((st) => st._id !== removedStickId)
      messageStore.setSuccess("Stick has been removed successfully")
    } catch (error) {
      messageStore.setError("Failed removing wordssssss")

      console.error("Error fetching user:", error)
      if (error.response) {
        // The request was made and the server responded with a status code outside of the range of 2xx
        console.error("Server response:", error.response.data)
      }
      if (error.response?.status === 401) {
        messageStore.setError("You are not authorized")
      }
    }
  }
  async addItem(groupId, item) {
    try {
      const response = await getbaseAxios().post(
        "/api/groups/add",
        { item },
        {
          params: {
            groupId,
          },
        }
      )

      console.log(response.data)

      this.items = [...this.items, response.data]
      messageStore.setSuccess("item added successfully")
    } catch (error) {
      messageStore.setError("Failed adding " + item.name)

      console.error("Error fetching user:", error)
      if (error.response) {
        // The request was made and the server responded with a status code outside of the range of 2xx
        console.error("Server response:", error.response.data)
      }
      if (error.response?.status === 401) {
        messageStore.setError("You are not authorized")
      }
    }
  }
  async getItems(groupId) {
    try {
      const response = await getbaseAxios().get("/api/items", {
        params: {
          groupId,
        },
      })
      console.log(response.data)
      console.log(this)

      this.words = response.data
    } catch (error) {
      console.error("Error fetching user:", error)
      if (error.response) {
        // The request was made and the server responded with a status code outside of the range of 2xx
        console.error("Server response:", error.response.data)
      }
      if (error.response?.status === 401) {
        messageStore.setError("You are not authorized")
      }
    }
  }

  async addUser(userId, name) {
    try {
      const response = await getbaseAxios().post("/api/users/add", {
        userId,
        name,
      })
      console.log(response.data)
      console.log(this)
    } catch (error) {
      console.error("Error fetching user:", error)
      if (error.response) {
        // The request was made and the server responded with a status code outside of the range of 2xx
        console.error("Server response:", error.response.data)
      }
      if (error.response?.status === 401) {
        messageStore.setError("You are not authorized")
      }
    }
  }
  async getUser(userId) {
    try {
      const response = await getbaseAxios().get(`/api/users/${userId}`)
      console.log(response.data)
      console.log(this)

      this.user = response.data
    } catch (error) {
      console.error("Error fetching user:", error)
      if (error.response) {
        // The request was made and the server responded with a status code outside of the range of 2xx
        console.error("Server response:", error.response.data)
      }
      if (error.response?.status === 401) {
        messageStore.setError("You are not authorized")
      }
    }
  }
  async createGroup(name) {
    const payload = {
      categoryName: name,
    }
    try {
      // Add a new document in collection "cities"
      await setDoc(doc(db, "cities", "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA",
      })
      messageStore.setSuccess("Category added successfully")
    } catch (error) {
      messageStore.setError("Failed adding category")

      console.error("Error fetching user:", error)
      if (error.response) {
        // The request was made and the server responded with a status code outside of the range of 2xx
        console.error("Server response:", error.response.data)
      }
      if (error.response?.status === 401) {
        messageStore.setError("You are not authorized")
      }
    }
  }

  async deleteCategory(id) {
    try {
      const response = await getbaseAxios().delete(`/api/categories/${id}`)
      console.log(response.data)
      const deletedId = response.data
      console.log({ deletedId, categories: this.categories })

      this.categories = [...this.categories].filter((c) => c._id !== deletedId) // This will be the user object returned from your API
      messageStore.setSuccess("Category deleted successfully")
    } catch (error) {
      messageStore.setError("Failed deleting category")

      console.error("Error fetching user:", error)
      if (error.response) {
        // The request was made and the server responded with a status code outside of the range of 2xx
        console.error("Server response:", error.response.data)
      }
      if (error.response?.status === 401) {
        messageStore.setError("You are not authorized")
      }
    }
  }
  async getCategories() {
    try {
      const response = await getbaseAxios().get("/api/categories")
      console.log(response.data)
      console.log(this)

      this.categories = response.data // This will be the user object returned from your API
    } catch (error) {
      console.error("Error fetching user:", error)
      if (error.response?.status === 401) {
        messageStore.setError("You are not authorized")
      }
    }
  }
}
export const debtStore = new Debt()
