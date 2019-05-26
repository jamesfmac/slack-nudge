import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production'? 'https://slack.stratejos.com': null,
    headers: {'Content-Type': 'application/json'}
  })

  export default instance 