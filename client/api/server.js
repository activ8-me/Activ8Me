const axios = require('axios')

const ip = '192.168.42.44'

const server = axios.create({
  baseURL: `http://${ip}:3000`
})

export default server