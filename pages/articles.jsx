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

const articles = observer(() => {
  const [chosenBelief, setChosenBelief] = useState("")
  const [userBelives, setUserBelives] = useState({})
  const [userArticle, setUserArticle] = useState({})
  const [articleImages, setArticleImages] = useState([])

  useEffect(() => {
    getBelivesApi().then((res) => {
      console.log(res)
      setUserBelives(res)
      setChosenBelief(res[0].name)
    })
  }, [])
  const getArticleImages = async () => {
    const images = await getArticleImagesApi("women are desire me")
    setArticleImages(images)
  }
  const getArticles = async () => {
    const res = await getArticlesApi()
    console.log(res)
  }
  const generateArticle = async () => {
    if (!chosenBelief || asyncStore.isLoading) {
      return
    }

    const question = `generate an article with a title and 1 paragraph for a user name: ${
      userStore.displayName || "Lee Yahav"
    } which have the belife of : ${
      beliefStore.belief
    }. I want that the arcitle will look like he allready achive it or something on the way there . please return the data in an object with the parms: title , content and currentDate in that format : DD/MM/YYYY 
    ( no more than 50 words response)`

    try {
      asyncStore.setIsLoading(true)
      const res = await askGptApi({
        question,
      })
      asyncStore.setIsLoading(false)
      console.log(res.data.message.content)
      setUserArticle(JSON.parse(res.data.message.content))
      getArticleImages()
    } catch (error) {
      asyncStore.setIsLoading(false)
      console.log(error)
    }
  }
  return (
    <div className="h-[100vh] w-screen bg-secondary flex flex-col  px-2">
      <Title>articles</Title>
      <StandardButton onClick={getArticles} className="bg-belief_pink">
        show article
      </StandardButton>
      <div>
        Chosen belief : <div className="bg-belief_gray_t">{chosenBelief}</div>
      </div>
      <StandardButton onClick={generateArticle} className="bg-belief_green">
        Generate Article
      </StandardButton>
      <StandardButton onClick={getArticleImages} className="bg-belief_green">
        show images
      </StandardButton>

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
