import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { beliefStore } from "mobx/beliefStore"
import { asyncStore } from "mobx/asyncStore"
import { userStore } from "mobx/userStore"
import {
  addArticlesApi,
  askGptApi,
  getArticleImagesApi,
  getArticlesApi,
  getBelivesApi,
  getMyImagesApi,
} from "api"
import Title from "ui/Title"
import StandardButton from "ui/button/standard"
import FilterBelive from "components/belives/FilterBelive"
import { filterStore } from "mobx/filterStore"
import { CSpinner } from "@coreui/bootstrap-react"
import { getRandInd } from "lib/util"

const articleList = observer(() => {
  const [articles, setArticles] = useState([])

  // const { belief } = filterStore

  useEffect(() => {
    getArticlesApi().then((res) => {
      console.log(res)
      setArticles(res)
    })
  }, [])

  return (
    <div className="h-[100vh] w-screen bg-secondary flex flex-col  px-2">
      <ul>
        {articles.map((article, key) => (
          <Article key={key} article={article} />
        ))}
      </ul>
    </div>
  )
})

export default articleList

function Article({ article }) {
  const { title, content, currentDate } = article.userArticle
  const { belief, images, myImage } = article

  return (
    <div className="h-[100vh] w-screen bg-secondary flex flex-col  px-2">
      <Title>MY Articles</Title>

      {asyncStore.isLoading && <CSpinner className="mt-10" color="primary" />}

      <div className="flex justify-center">
        <div className="flex flex-col items-center w-[80%] ">
          <div className="font-bold text-lg underline mb-5"> {title} </div>
          <div className=""> {content}</div>

          <div className="relative w-full flex justify-between">
            <div className="grid grid-cols-3">
              {images?.slice(0, images.length / 2).map((imgId, key) => (
                <li key={key} className="" onClick={() => {}}>
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/${imgId}`}
                    alt="something her "
                    className="w-40 h-40"
                  />
                </li>
              ))}
            </div>

            <img
              id="my-image"
              src={myImage}
              alt="something me "
              className="  object-contain w-96 h-96 opacity-100"
            />

            <div className="grid grid-cols-3">
              {images
                ?.slice(images.length / 2, images.length)
                .map((imgId, key) => (
                  <li key={key} className="" onClick={() => {}}>
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/${imgId}`}
                      alt="something her "
                      className="w-40 h-40"
                    />
                  </li>
                ))}
            </div>
          </div>
          <div className="self-end mt-5 text-[10px]"> {currentDate}</div>
        </div>
      </div>
    </div>
  )
}
