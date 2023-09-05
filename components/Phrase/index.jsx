import { observer } from "mobx-react-lite"
import { useRouter } from "next/router"

const Phrase = observer(({ phrase }) => {
  return (
    <div className="flex justify-center cursor-pointer items-center p-2 rounded-md bg-blue-500">
      {phrase.text}-{phrase.translation}
    </div>
  )
})
export default Phrase
