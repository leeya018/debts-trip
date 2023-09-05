import { SHOWS } from "lib/util"
import { navStore } from "mobx/navStore"
import { testStore } from "mobx/testStore"
import React from "react"

export default function Modes({ className }) {
  return (
    <div className={`flex p-3 gap-2 ${className}`}>
      <Mode mode={SHOWS.all} />
      <Mode mode={SHOWS.flip} />
      <Mode mode={SHOWS.pick} />
      <Mode mode={SHOWS.hover} />
    </div>
  )
}

function Mode({ mode }) {
  return (
    <div>
      <input
        type="radio"
        checked={testStore.showMode === mode}
        value={mode}
        onChange={(e) => testStore.setShowMode(mode)}
        name="show"
      />{" "}
      {mode}
    </div>
  )
}
