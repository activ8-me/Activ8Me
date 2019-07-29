const axios = require('axios')

const ip = '192.168.42.222'

const server = axios.create({
  baseURL: `http://${ip}:3000`
})

export default server
