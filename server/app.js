if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const index = require('./routers/index.js')
const cors = require('cors')
const mongoose = require('mongoose')
const error = require('./helpers/error')
let url
if (process.env.NODE_ENV === 'test') {
  url = process.env.DATABASE_URL_TEST
} else if (process.env.NODE_ENV === 'development') {
  url = process.env.DATABASE_URL_DEV
} else {
  url = process.env.DATABASE_URL_PROD
}

mongoose.connect(url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(err => {
    console.log(err)
  })

app.use(cors())

app.use(express.urlencoded({
  extended: false
}))
app.use(express.json())

app.use('/', index)
app.use(error)

app.listen(port, () => {
  console.log('listening to port', port)
})

// module.exports = app