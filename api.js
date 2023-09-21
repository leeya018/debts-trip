import axios from 'axios';
import { getUrl } from 'lib/util';
import { messageStore } from 'mobx/messageStore';


const url = getUrl()

const askGpt = async(body) => {
    try {
    const res =  await axios.post(url+'/gpt' ,body  , {headers: {
        'Content-Type': 'application/json'
      }})
      console.log(res);
      return res
    } catch (error) {
        console.error("Error fetching user:", error)
    }
}


export  {
    askGpt
}