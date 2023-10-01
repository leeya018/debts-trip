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
const lexaAmount = 12
const paragraphs = 1
const words = 50

const articles = observer(() => {
  // const [belief, setbelief] = useState("")
  const [userBelives, setUserBelives] = useState({})
  const [userArticle, setUserArticle] = useState({})
  const [articleImages, setArticleImages] = useState([])
  const [myImage, setMyImage] = useState("")
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
  const getImages = async () => {
    const values = await Promise.all([getArticleImages(), getMyImagesApi()])
    console.log(values)
    asyncStore.setIsLoading(false)
    setArticleImages(values[0])
    const mImg = [getRandInd(values[1].length)]
    setMyImage(mImg)
  }

  const getFullArticle = async () => {
    if (!isClickEnable() || asyncStore.isLoading) {
      return
    }
    asyncStore.setIsLoading(true)
    const values = await Promise.all([
      generateArticle(),
      getArticleImages(),
      getMyImagesApi(),
    ])
    console.log(values)
    asyncStore.setIsLoading(false)
    setUserArticle(JSON.parse(values[0]))
    setArticleImages(values[1])
    const mImg = values[2][getRandInd(values[2].length)]
    setMyImage(mImg)

    const article = {
      belief: belief,
      images: values[1].map((im) => im.id).slice(0, lexaAmount),
      userArticle: JSON.parse(values[0]),
      myImage: mImg,
    }
    addArticlesApi(article)
  }
  const generateArticle = async () => {
    const question = `generate an article with a title and ${paragraphs} paragraph for a user name: ${
      userStore.displayName || "Lee Yahav"
    } which have the belife of : ${
      beliefStore.belief
    }. I want that the arcitle will look like he allready achive it or something on the way there .
     please return the data in an object with the parms: title , content and currentDate in that format : DD/MM/YYYY 
    ( no more than ${words} words response)`

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
      <StandardButton onClick={getImages} className="bg-belief_green">
        show images
      </StandardButton>
      {asyncStore.isLoading && <CSpinner className="mt-10" color="primary" />}

      <div className="flex justify-center">
        <div className="flex flex-col items-center w-[80%] ">
          <div className="font-bold text-lg underline mb-5">
            {" "}
            {userArticle?.title}{" "}
          </div>
          <div className=""> {userArticle?.content}</div>

          <div className="relative w-full flex justify-between">
            <div className="grid grid-cols-3">
              {articleImages?.slice(0, lexaAmount / 2).map((img, key) => (
                <li key={key} className="" onClick={() => {}}>
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/${img.id}`}
                    alt="something her "
                    className="w-40 h-40"
                  />
                </li>
              ))}
            </div>

            {myImage && (
              <img
                id="my-image"
                src={myImage}
                alt="something me "
                className="  object-contain w-96 h-96 opacity-100"
              />
            )}

            <div className="grid grid-cols-3">
              {articleImages
                ?.slice(lexaAmount / 2, lexaAmount)
                .map((img, key) => (
                  <li key={key} className="" onClick={() => {}}>
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGES_URL}/${img.id}`}
                      alt="something her "
                      className="w-40 h-40"
                    />
                  </li>
                ))}
            </div>
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
