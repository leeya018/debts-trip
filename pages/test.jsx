import React, { useState } from "react"

const FileUpload = () => {
  const [files, setFiles] = useState([])

  const handleFileChange = (e) => {
    // Store the selected files in state
    setFiles(e.target.files)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    // Create a FormData object to store the selected files
    const formData = new FormData()

    // Append each file to the FormData object
    Array.from(files).forEach((file) => {
      formData.append("files", file)
    })

    // Send the FormData object to the server using fetch or other libraries like axios
    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="file" onChange={handleFileChange} multiple />
      <button type="submit">Upload</button>
    </form>
  )
}

export default FileUpload
