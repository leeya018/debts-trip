
import nc from "next-connect"
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_GPT,
  dangerouslyAllowBrowser:true
});
const handler = nc({ attachParams: true })



handler.post(async (req, res) => {
    const { question } = req.body
    console.log('req.body')
    console.log(req.body)
  try {
    const completion  = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "user",
            "content": `${question}`
          }
        ],
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      console.log(completion.choices[0]);
    
    return res.status(200).json(completion.choices[0]);
  } catch (error) {
    return res.status(451).json(error.message);
  }
  })

export default handler
