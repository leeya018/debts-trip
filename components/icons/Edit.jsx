import React, { useState } from "react"
import Button from "ui/button"
import { Grid } from "@mui/material"
import DeleteIcon from "@material-ui/icons/Delete"

export default function EditIcon({ onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Button
      variant="danger"
      onClick={onClick}
      //   onMouseEnter={() => setHovered(true)}
      //   onMouseLeave={() => setHovered(false)}
    >
      <Grid item xs={8}>
        <DeleteIcon
          style={{
            margin: 1,
            fontSize: 32,
            color: hovered ? "red" : "black",
            transitionDuration: "1s",
          }}
        />
      </Grid>
    </Button>
  )
}
