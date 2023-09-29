import React, { useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { beliefStore } from "mobx/beliefStore"
import { asyncStore } from "mobx/asyncStore"
import { userStore } from "mobx/userStore"
import {
  askGptApi,
  getArticleImagesApi,
  getArticlesApi,
  getBelivesApi,
} from "api"
import Title from "ui/Title"
import StandardButton from "ui/button/standard"
import FilterBelive from "components/belives/FilterBelive"
import { filterStore } from "mobx/filterStore"
import { CSpinner } from "@coreui/bootstrap-react"

const articles = observer(() => {
  // const [belief, setbelief] = useState("")
  const [userBelives, setUserBelives] = useState({})
  const [userArticle, setUserArticle] = useState({})
  const [articleImages, setArticleImages] = useState([])
  const { belief } = filterStore

  useEffect(() => {
    getBelivesApi().then((res) => {
      console.log(res)
      setUserBelives(res)
    })
  }, [])
  const isClickEnable = () => {
    return (
      belief !== "" &&
      belief.split(" ").length >= 3 &&
      asyncStore.isLoading == false
    )
  }
  const getArticleImages = async () => {
    try {
      const images = await getArticleImagesApi(belief)
      return images
    } catch (error) {
      asyncStore.setIsLoading(false)
    }
  }

  const getFullArticle = async () => {
    if (!isClickEnable() || asyncStore.isLoading) {
      return
    }
    asyncStore.setIsLoading(true)
    const values = await Promise.all([generateArticle(), getArticleImages()])
    console.log(values)
    asyncStore.setIsLoading(false)
    setUserArticle(JSON.parse(values[0]))
    setArticleImages(values[1])
  }
  const generateArticle = async () => {
    const question = `generate an article with a title and 1 paragraph for a user name: ${
      userStore.displayName || "Lee Yahav"
    } which have the belife of : ${
      beliefStore.belief
    }. I want that the arcitle will look like he allready achive it or something on the way there . please return the data in an object with the parms: title , content and currentDate in that format : DD/MM/YYYY 
    ( no more than 50 words response)`

    try {
      const res = await askGptApi({
        question,
      })
      console.log(res.data.message.content)
      return res.data.message.content
    } catch (error) {
      asyncStore.setIsLoading(false)
      console.log(error)
    }
  }
  return (
    <div className="h-[100vh] w-screen bg-secondary flex flex-col  px-2">
      <Title>articles</Title>
      <StandardButton onClick={() => {}} className="bg-belief_pink">
        show article
      </StandardButton>

      <div className="bg-belief_green flex"> Chosen belief : {belief}</div>

      <FilterBelive />
      <StandardButton
        disabled={isClickEnable()}
        onClick={getFullArticle}
        className={isClickEnable() ? "bg-belief_green" : "bg-belief_gray_t"}
      >
        Generate Article
      </StandardButton>
      {/* <StandardButton onClick={getArticleImages} className="bg-belief_green">
        show images
      </StandardButton> */}
      {asyncStore.isLoading && <CSpinner className="mt-10" color="primary" />}

      <div className="flex justify-center">
        <div className="flex flex-col items-center w-[80%] ">
          <div className="font-bold text-lg underline mb-5">
            {" "}
            {userArticle?.title}{" "}
          </div>
          <div className=""> {userArticle?.content}</div>
          <div className="relative flex flex-wrap gap-2 justify-between">
            {/* <img src="absolute w-40 h-40 " alt="profile img" /> */}
            {articleImages?.slice(0, 10).map((img, key) => (
              <li key={key} className="" onClick={() => {}}>
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/${img.id}`}
                  alt="something her "
                  className="w-40 h-40"
                />
              </li>
            ))}
          </div>
          <div className="self-end mt-5 text-[10px]">
            {" "}
            {userArticle?.currentDate}
          </div>
        </div>
      </div>
    </div>
  )
})

export default articles
