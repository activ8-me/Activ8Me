if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const cors = require('cors')
const mongoose = require('mongoose')
const cron = require('cron')
const moment = require('moment')
// /* istanbul ignore next */
// let url
// /* istanbul ignore next */
// if (process.env.NODE_ENV === 'test') {
//   url = process.env.DATABASE_URL_TEST
// }
// /* istanbul ignore next */
// else if (process.env.NODE_ENV === 'development') {
//   url = process.env.DATABASE_URL_DEV
// }
// /* istanbul ignore next */
// else {
//   url = process.env.DATABASE_URL_PROD
// }

let url = 'mongodb://localhost:27017/activ8me-' + process.env.NODE_ENV

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


const Alarm = require('./models/alarm')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const CronJob = cron.CronJob

const job = new CronJob('58 * * * * *', async function () {
    let currentTime = new Date()
    console.log("Running every minute", moment(currentTime).format('hh:mm:ss'))
    try {
        let alarms = await Alarm.find({
            days: moment(currentTime).format('dddd'),
            time: moment(currentTime).add(1, "minute").format('LT'),
            status: true
        })
        let alarmId = []
        let registrationTokens = []
        for(let i = 0; i < alarms.length; i++){
            alarmId.push(alarms[i]._id)
            registrationTokens.push(alarms[i].fcmToken)
        }
        let payload = {
            data: {
                alarmId
            }
        }
        admin
            .messaging()
            .sendToDevice(registrationToken, payload)
            .then(function(response) {
                // See the MessagingDevicesResponse reference documentation for
                // the contents of response.
                console.log('Successfully sent message:', response);
            })
            .catch(function(error) {
                console.log('Error sending message:', error);
            });
    }
    catch (err) {
        console.log(err)
    }
}, null, true)

app.listen(port, function () {
    console.log('Listening to port ' + port)
})

module.exports = app