import { useState, useEffect } from "react"

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : JSON.parse(initialValue)
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const getValue = (key) => {
    return JSON.parse(window.localStorage.getItem(key))
  }

  const removeValue = (key) => {
    return window.localStorage.removeItem(key)
  }

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setValue(storedValue)
  }, [key])

  return [storedValue, setValue, getValue, removeValue]
}

export default useLocalStorage
