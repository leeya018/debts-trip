import axios from "axios"
import Freecurrencyapi from "@everapi/freecurrencyapi-js"

export const getUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASIC_URL
    : ""
  // : process.env.NEXT_PUBLIC_BASIC_URL_PRODUCTION;
}

export const createStick = (question, date, categoryId) => {
  if (question === "") return null
  const d = date || new Date()
  const item = {
    question,
    categoryId,
    createdAt: new Date(d),
  }
  return item
}

export const tokenItem = "google_access_token"

export const parseJwt = (token) => {
  var base64Url = token.split(".")[1]
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join("")
  )
  console.log(JSON.parse(jsonPayload))

  return JSON.parse(jsonPayload)
}

export const PATH_NAMES = {
  friends: "friends",
  myList: "myList",
  split: "split",
  loginOption: "loginOption",
  login: "login",
}
export const navNames = {
  download: "download",
  practice: "practice",
  categories: "categories",
}
export const modals = {
  remove: "remove",
  edit: "edit",
  signup: "signup",
  currency: "currency",
}

//

/// util
export const NavItems = {
  categories: "categories",
  words: "words",
  test: "test",
  prem: "prem",
  about: "about",
  logout: "logout",
}
export const SideItems = {
  rich: "rich",
  res: "res",
  dream: "dream",
  action: "action",
  break: "break",
}

export const SHOWS = {
  all: "all",
  pick: "pick",
  hover: "hover",
  flip: "flip",
}

export const data = {
  rich: {
    title: "How To Get Rich",
    youtube: "https://www.youtube.com/embed/cQ4t_aYb3qo",
    subs: ["See What You Want", "Think 10X", "Act Now"],
    info: [
      "1. The Foundation of Wealth: A 10X Mindset One cannot hope to accumulate immense wealth without first cultivating the right mindset. Getting rich quickly isn't about finding shortcuts or luck; it's about scaling up your actions and ambitions by a factor of ten. This is the essence of the 10X mindset. When you set goals that are 10 times greater than the average and back those ambitions with ten times the effort, you position yourself on the path of exponential growth. Most individuals dream and operate on a linear scale, aiming for marginal improvements. The 10X thinker, however, dares to envision the improbable and then sets out to achieve it.",
      "2. Embracing Risk and Opportunity Risk and reward go hand in hand. Those who stick to the comfort of a steady paycheck and shy away from opportunities, fearing potential pitfalls, seldom make it big. But with a 10X mindset, one learns to see risk differently: not as a threat but as a portal to immense opportunities. These are the high-stake investments, the entrepreneurial ventures, and the innovative leaps. Recognize that while failure is a possibility, it's also a learning tool. The aim is not to avoid setbacks but to recover, recalibrate, and rise with renewed vigor.",
      "3. Mastery and Continuous Learning No matter the field, those who rise to the top and achieve wealth rapidly are often masters of their craft. But mastery isn't a one-time achievement; it's an ongoing journey of learning and improvement. This means investing in oneself—through education, training, and practice. With a 10X mindset, one doesn't just strive for proficiency; they strive for unparalleled excellence. It's this excellence that sets one apart in a competitive market, allowing for faster wealth accumulation.",
      "4. Building Robust Networks Your net worth is often a reflection of your network. While individual effort and prowess are vital, the connections you foster can accelerate your journey. A 10X mindset emphasizes not just personal growth but also the cultivation of valuable relationships. This entails seeking mentorship, partnering with like-minded visionaries, and offering genuine value in every interaction. It's these relationships that open doors to exclusive opportunities, insider knowledge, and collaborative ventures that can multiply your wealth rapidly.",
      "5. Resilience and Adaptability Lastly, the road to rapid wealth is riddled with challenges. Economic downturns, business failures, and unforeseen obstacles are part and parcel of the journey. The difference between those who make it big and those who falter lies in resilience. A 10X mindset doesn't buckle under pressure; it thrives on it. Adaptability is key. It's the ability to pivot when necessary, to change strategies when required, and to persevere with unwavering determination. It's this tenacity, combined with a grand vision and scaled actions, that paves the golden path to wealth",
    ],
  },
  res: {
    title: "Get Massive results",
    youtube: "https://www.youtube.com/embed/TTX7rPO4pZs",
    subs: ["Think Big", "Get A Model", "10X Your Actions"],
    info: [
      "1. Visionary Goal Setting The genesis of monumental results begins with setting audacious goals. Traditional SMART goals, while effective for smaller tasks, might not inspire the kind of groundbreaking efforts required for massive results. Instead, think BIG – set goals that seem slightly out of reach, goals that stretch your imagination and challenge the norm. Elon Musk didn’t aim to make a slightly better car; he set out to redefine transportation with Tesla. Such a visionary goal kindles passion, sparks innovation, and attracts like-minded individuals who share your daring ambition. When you raise the bar exceptionally high, you subconsciously mobilize resources, both internal and external, towards achieving the extraordinary.",
      "2. Immersive Focus and Elimination of Distractions In our hyper-connected era, distractions are plentiful, making it easy to spread ourselves thin across multiple tasks. However, achieving massive results requires an almost obsessive focus on the task at hand. This deep focus, often referred to as 'flow', is when one is completely engrossed in an activity, leading to heightened productivity and creativity. It's imperative to create an environment conducive to this state. This means eliminating unnecessary tasks, saying no more often, and using tools and techniques, like the Pomodoro Technique, to facilitate sustained concentration. By honing in on a singular objective, your efforts compound, driving you faster towards your target.",
      "3. Embracing Continuous Learning and Adaptation The landscape of success is dynamic, with ever-changing terrains. What worked yesterday might not be as effective tomorrow. The most successful individuals, teams, and organizations are those that continuously learn, adapt, and evolve. This means not resting on past laurels, but instead, always seeking feedback, being open to change, and having the humility to accept when a pivot is necessary. With every setback or failure, there's a lesson to be embraced. By internalizing these lessons and iterating your strategies, you set the stage for results that are not just massive but also sustainable.",
      "4. Leveraging Synergy and Collaboration No monumental task has ever been achieved in isolation. The power of collective effort is unparalleled. Even if you're a solo entrepreneur or an individual contributor, it's crucial to recognize the strengths of those around you. Collaborating with others can bring in fresh perspectives, specialized skills, and a multiplied energy that you wouldn’t achieve on your own. Be it through partnerships, team efforts, or even mentor-mentee relationships, the amalgamation of diverse talents and visions can catalyze the journey to massive results. Remember, it's the combined might of individual forces that shapes mountains and redirects rivers.",
    ],
  },
  action: {
    title: "10X Your Action",
    youtube: "https://www.youtube.com/embed/KR7RS1JquCg",
    subs: [
      "Have Massive Action Plan (First Week)",
      "Act",
      "End Of Day Analyze",
      "Feedback",
      "Improve Plan",
    ],
    info: [
      "1. The 10X Mindset Shift: The foundation of taking 10X action starts not with what you do, but how you think. Traditional methods of working often promote linear progress—do a bit more, push a bit further, and results will follow suit. However, the 10X mindset shatters this approach, demanding you to think not just about doubling, but decupling your efforts. But why tenfold? This magnitude forces you out of conventional thinking, propelling you into the realm of the extraordinary. It's not about merely working harder but working smarter, seeking leverage, and always thinking bigger. While daunting, this approach can illuminate possibilities and avenues that were previously unseen. It's the difference between aiming to increase sales by 10% and strategizing to boost them by 1000%. The latter may not always be reached, but the journey there often surpasses the former target.",
      "2. Ruthless Prioritization and Time Mastery: 10X actions are not about cramming more tasks into your day; it's about honing in on what truly matters. To truly scale your efforts, it's essential to master the art of prioritization. Determine the high-impact activities that drive your goals and focus relentlessly on them, often at the expense of lesser tasks. This also means becoming a master of your time. Techniques like time blocking, where specific chunks of the day are allocated to singular tasks, can be invaluable. Furthermore, embrace the Pareto Principle or the 80/20 rule: 80% of results often come from just 20% of actions. Identify and amplify those actions.",
      "3. Embrace Continuous Learning and Rapid Iteration: The landscape of success is dynamic, and a 10X mindset requires adaptability. This means taking feedback in stride, continuously learning, and being prepared to pivot when necessary. It's about maintaining momentum—when one approach falters, instead of grinding to a halt, you quickly iterate and test a new strategy. This cycle of action-feedback-adaptation keeps you moving at a rapid pace, ensuring that your actions are not just amplified in quantity but are also refined in quality. With each iteration, your 10X actions become more potent, driving you closer to monumental outcomes.",
    ],
  },
  dream: {
    title: "Get Your Dreams Now",
    youtube: "https://www.youtube.com/embed/EZ6McmMosd4",
    subs: [
      "Think All Possible",
      "Nothing Can Stop You",
      "Dream Big",
      "Exectute Rapidly No Think",
    ],
    info: [
      "1. Clarifying and Visualizing Your Dreams: At the heart of every major achievement lies a dream. But not just any vague aspiration – it's a dream so vivid and clear that it feels tangible even before it's realized. Before you can pursue your dreams, you must define them in exquisite detail. This goes beyond merely saying `I want success.` Instead, delve deep into what success looks like for you. Is it a serene home overlooking the ocean, spearheading an innovative project, or perhaps a journey to distant lands? Visualization is a powerful tool in this process. Spend time each day imagining yourself living your dream, feeling the emotions associated with it, and detailing every nuance. This daily practice not only creates an emotional connection but also primes your subconscious to spot opportunities and pathways to turn the dream into reality.",
      "2. Actionable Roadmaps and Immediate Steps: Dreams remain ethereal until they're anchored in actionable steps. While the grandiosity of a dream can be overwhelming, breaking it down into a series of smaller, achievable tasks makes it manageable. Start by mapping out a roadmap – a step-by-step guide leading to your dream. But don't just stop at planning; take immediate action. Even if it's a tiny step, it builds momentum. For instance, if your dream is to write a novel, start by writing a single paragraph today. The immediacy of action combats procrastination and instills a sense of achievement, propelling you forward on your quest.",
      "3. Cultivate an Unwavering Belief and Resilience: Every journey towards a dream is dotted with challenges, setbacks, and naysayers. Here, the armor that shields you and the fuel that drives you is unwavering belief in your dream and yourself. Cultivate an environment that reinforces this belief. Surround yourself with supporters, immerse in inspirational content, and regularly revisit your achievements, no matter how small. When faced with failures, view them not as dead-ends but as detours, rich with lessons. By maintaining an indomitable spirit and bouncing back from every setback, your dream ceases to be a distant star and transforms into a present reality, awaiting your grasp.",
    ],
  },
  break: {
    title: "Break Your Limiting Belives",
    youtube: "https://www.youtube.com/embed/1FQ7WdAi_Lo",
    subs: [
      "Recognizing the Power of the Mind:",
      "Challenging and Reframing Limiting Belief",
      "Gathering Contrary Evidence",
      " Immersing in Growth Mindset and Continuous Affirmation",
    ],
    info: [
      "1. Recognizing the Power of the Mind : Our reality, to a considerable extent, is shaped by our beliefs. These deeply ingrained convictions act as lenses through which we interpret the world. While empowering beliefs propel us towards success, limiting beliefs act as silent saboteurs, subtly undermining our potential. Often rooted in past experiences, societal norms, or even protective mechanisms, these beliefs whisper doubts into our ears: `I'm not good enough,` `Success is reserved for others,` or `I can't achieve that.` Recognizing these beliefs is the first critical step. It involves a profound introspection and often requires brutal honesty. Jotting down recurring negative self-talk or mapping patterns in past failures can unveil these hidden adversaries.",
      "2. Challenging and Reframing Limiting Beliefs: Once identified, it's vital not to accept these beliefs passively. Challenge them. If a belief stems from a past failure, ask yourself: 'Is one setback a comprehensive representation of my abilities?' More often than not, the answer will be a resounding 'no'. Delve into the origins of these beliefs. Understand that many are based on outdated information or external opinions that have no bearing on your current self. Reframing is an effective tool here. For instance, instead of perceiving a failure as proof of your ineptitude, see it as a learning opportunity, a stepping stone on your journey to mastery.",
      "3. Gathering Contrary Evidence: The best way to debunk a limiting belief is to prove it wrong. Start by collecting evidence that challenges the veracity of your belief. If you believe you're a poor public speaker, remind yourself of times when you successfully communicated an idea, even if it was in a smaller group or a different context. Seek feedback from trusted peers, and you might find their perspective vastly different from your internal critic. Over time, accumulating this contrary evidence builds a case against the limiting belief, weakening its grip on you.",
      "4. Immersing in Growth Mindset and Continuous Affirmation: Carol Dweck's concept of the 'growth mindset' is pivotal in combating limiting beliefs. Adopt the belief that abilities and intelligence can be developed through dedication and hard work. This perspective fosters a love for learning and resilience in the face of challenges. Moreover, affirmations—positive statements that challenge and control negative thoughts—are tools that, when repeated, can change our perception of ourselves and our potential. By immersing yourself in a growth-oriented environment and regularly affirming your capabilities, you not only break the chains of limiting beliefs but also lay the foundation for a future unbounded by self-imposed barriers.",
    ],
  },
}

export const getFromLocalStorage = (key, initialValue) => {
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  } catch (error) {
    return initialValue
  }
}

export const setToLocalStorage = (key, value) => {
  try {
    const valueToStore =
      value instanceof Function ? value(getFromLocalStorage(key, null)) : value
    window.localStorage.setItem(key, JSON.stringify(valueToStore))
  } catch (error) {
    console.error(`Failed to set ${key} in localStorage: ${error}`)
  }
}
// moved  fixed
//
export const getbaseAxios = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("google_access_token")
    return axios.create({
      baseURL: getUrl(),
      headers: {
        Authorization: `${token}`,
        Accept: "application/json",
      },
    })
  }
}

export const DB_CONNECTIONS = {
  groups: "groups",
}
export const freecurrencyapi = new Freecurrencyapi(
  process.env.NEXT_PUBLIC_CURRENCY_KEY
)

export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0") // Months are zero-based
  const year = String(date.getFullYear()).slice(-2) // Get the last two digits of the year

  return `${year}/${month}/${day}`
}

export const formatTime = (date) => {
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")

  return `${hours}:${minutes}`
}
