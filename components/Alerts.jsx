import { observer } from "mobx-react-lite"
import { messageStore } from "mobx/messageStore"
import React, { useEffect } from "react"
import styles from "styles"

const Alerts = observer(({ className }) => {
  const { error, success, setError, setSuccess } = messageStore
  useEffect(() => {
    setError("")
    setSuccess("")
  }, [])
  return (
    <div className={`h-[1rem] ml-20 ${className}`}>
      <div style={styles.error}>{error}</div>
      <div style={styles.success}>{success}</div>
    </div>
  )
})

export default Alerts
