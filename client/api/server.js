const axios = require('axios')

const ip = '10.107.216.51' //'192.168.43.119'

const server = axios.create({
  baseURL: `http://${ip}:3000`
})

export default server
