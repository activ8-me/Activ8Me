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

let counter = 0 

const admin = require('firebase-admin');
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://activ8me-alarm.firebaseio.com"
});

/* istanbul ignore next */
app.get('/test', (req, res) => {
  const payload = { 
    data: { alarmId: '["5d3ea0ad8ae67c524e74d114"]' },
    tokens: [ 'cOh5AHGi8ac:APA91bEDXnt9N-D3zFcdJME-eZ_pgdWiJySn8Hxlt90wi409HXKDIVI56itrdxbTuvpX-xGsf0iUqJtQcpi7bfvQE1zLYmgY_uIaEnEUg5wskRPwHhOtS6tyEH3_Bl_U9s5ivNWuL4hC' ] 
  }
  admin
    .messaging()
    .sendMulticast(payload)
    .then(function(response) {
        console.log('Sent test notif:', response);
        res.json(response)
    })
    .catch(function(error) {
        console.log('Error sending message:', error);
    });
})

app.use('/', index)
app.use(error)

app.listen(port, () => {
  console.log('listening to port', port)
})

module.exports = app