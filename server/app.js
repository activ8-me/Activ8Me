/* istanbul ignore next */
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
/* istanbul ignore next */
let url

/* istanbul ignore next */
if (process.env.NODE_ENV === 'test') {
  url = process.env.DATABASE_URL_TEST
}
/* istanbul ignore next */
else if (process.env.NODE_ENV === 'development') {
  url = process.env.DATABASE_URL_DEV
}
/* istanbul ignore next */
else {
  url = process.env.DATABASE_URL_PROD
}

/* istanbul ignore next */
mongoose.connect(url, {
    useNewUrlParser: true
  })
  /* istanbul ignore next */
  .then(() => {
    console.log('connected to MongoDB');
  })
  /* istanbul ignore next */
  .catch(err => {
     /* istanbul ignore next */
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

module.exports = app