import React, { useState } from "react"
import StarRateIcon from "@mui/icons-material/StarRate"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import BlueButton from "components/site/content/buttons/blue"
import PayButton from "components/site/content/buttons/pay"
import { Router } from "react-router-dom"
import { useRouter } from "next/router"

const plans = [
  {
    bgColor: "bg-premB1",
    name: "Free",
    titleButton: "Try Free",
    bestFor: "Best for learning basic spanish",
    greatFor: "Scaling your spanish levels",
    featuresTitle: "Free Plan features",
    features: ["Can learn up to 5 categories", "Can learn up to 200 words"],
    price: 0,
    link: "prepayment",
  },
  {
    bgColor: "bg-premB2",
    name: "Starter",
    titleButton: "Buy now",
    bestFor: "Best for learning upgrading your skills",
    greatFor: "Scaling your spanish to be pro",
    featuresTitle: "starter Plan features",
    features: [
      "Unlimited amount of categories",
      "Unlimited amount of words",
      "Testing your self",
      "Get a graph for progress",
      "give you more skillset for learn the words",
    ],
    price: 25,
    link: "https://meshulam.co.il/purchase?b=f53c4bbd50bd70944b81f048257578f6",
  },
  {
    bgColor: "bg-premB3",
    name: "Pro",
    titleButton: "Buy now",
    bestFor: "Best for learning to be a native speaker",
    greatFor: "being able to talk fluintly and gramaticly",
    featuresTitle: "Pro Plan features",
    features: [
      "Unlimited amount of categories",
      "Unlimited amount of words",
      "Testing your self",
      "Get a graph for progress",
      "give you more skillset for learn the words",
      "using memory thehniques and games",
      "can use it also on a plan in avion mode",
    ],
    price: 67,
    link: "https://meshulam.co.il/purchase?b=78f57726db8dd92503710ea02e2af4d2",
  },
]

export default function Premium() {
  const [isMonthly, setisMonthly] = useState(true)

  return (
    <div className=" flex flex-col items-center ">
      <div className="font-bold flex gap-3 justify-center">
        <div
          className={`text-3xl cursor-pointer ${!isMonthly ? "underline" : ""}`}
          onClick={() => setisMonthly(false)}
        >
          Pay annually
        </div>
        <div
          className={`text-3xl cursor-pointer ${isMonthly ? "underline" : ""}`}
          onClick={() => setisMonthly(true)}
        >
          Pay monthly
        </div>
      </div>
      <div className="flex gap-5">
        {
          // plans.map((p,key)=><div key={key}>{JSON.stringify(p)}</div>)
          plans.map((p, key) => (
            <Plan key={key} plan={p} isMonthly={isMonthly} />
          ))
        }
      </div>
    </div>
  )
}

function Plan({ plan, isMonthly }) {
  const router = useRouter()

  const goToPayment = () => {
    router.push(plan.link)
  }
  return (
    <div
      className={`mt-10 flex w-96 box-border shadow-xl rounded-2xl ${plan.bgColor}`}
    >
      <div className="p-10  h-full ">
        <div className="font-bold text-4xl mb-5">{plan.name}</div>
        <div>{plan.bestFor}</div>
        <div className="mt-10">
          {" "}
          $
          <span className="text-4xl font-bold">
            {" "}
            {!isMonthly ? plan.price * 12 : plan.price}
          </span>
          /{!isMonthly ? "year" : "month"}
        </div>
        <PayButton
          onClick={goToPayment}
          className="my-10 bg-buttonP1 hover:bg-buttonP2"
        >
          {plan.titleButton}
        </PayButton>
        <div className="font-bold">Great for:</div>
        <div>{plan.greatFor}</div>
        <div className="font-bold mt-10">{plan.featuresTitle}</div>
        <ul className=" flex flex-col gap-3 mt-2">
          {plan.features.map((f, ind) => {
            return <PremiumUl key={ind} feature={f} />
          })}
        </ul>
      </div>
    </div>
  )
}

const PremiumUl = function ({ className, feature }) {
  return (
    <li className="flex">
      <StarRateIcon className="mr-2 text-green" />
      <div>{feature}</div>
      <ErrorOutlineIcon className={`  ml-auto ${className}`} />
    </li>
  )
}
