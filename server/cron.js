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
const admin = require('firebase-admin');
const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://activ8me-alarm.firebaseio.com"
});

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


const Alarm = require('./models/alarm')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const CronJob = cron.CronJob

const job = new CronJob('57 * * * * *', async function () {
    let currentTime = new Date()
    try {
        let alarm1 = await Alarm.find({
            days: moment(currentTime).format('dddd'),
            time: moment(currentTime).add(1, "minute").format('LT'),
            status: true
        })
        let alarm2 = await Alarm.find({
            days: { $size: 0 },
            time: moment(currentTime).add(1, "minute").format('LT'),
            status: true
        })
        let alarmId = []
        let alarms = alarm1.concat(alarm2)
        let registrationTokens = []
        for(let i = 0; i < alarms.length; i++){
            alarmId.push(alarms[i]._id)
            registrationTokens.push(alarms[i].fcmToken)
        }
        let payload = {
            notification: {
                title: 'CRON check alarm',
                body: 'Dari CRON',
            },
            data: {
                alarmId: JSON.stringify(alarmId)
            }
        }
        if(registrationTokens.length!==0){
            admin
                .messaging()
                .sendToDevice(registrationTokens, payload)
                .then(function(response) {
                    console.log('Successfully sent message:', response);
                })
                .catch(function(error) {
                    console.log('Error sending message:', error);
                });
        }
    }
    catch (err) {
        console.log(err)
    }
}, null, true)

app.listen(port, function () {
    console.log('Listening to port ' + port)
})

module.exports = app