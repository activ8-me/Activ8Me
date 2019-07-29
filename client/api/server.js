const axios = require('axios')

const ip = '10.0.2.2'

const server = axios.create({
  baseURL: `http://${ip}:3000`
})

export default server