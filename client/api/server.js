const axios = require('axios')

const ip = '35.247.177.52'

const server = axios.create({
  baseURL: `http://${ip}:3000`
})

export default server
