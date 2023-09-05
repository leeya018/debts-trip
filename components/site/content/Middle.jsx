import React from "react"
import { data } from "lib/util"
import { observer } from "mobx-react-lite"
import { sideStore } from "mobx/sideStore"

const Middle = observer(() => {
  console.log(data[sideStore.activeTab]?.youtube)
  return (
    <div className="ml-5 mt-6">
      <div className="video-responsive  ">
        <iframe
          className="rounded-xl"
          width="646"
          height="393"
          src={data[sideStore.activeTab]?.youtube}
          // src={`https://www.youtube.com/embed/YEkNe-PhMag`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    </div>
  )
})
export default Middle
