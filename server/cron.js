if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const mongoose = require('mongoose')
const cron = require('cron')
const moment = require('moment')
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
// mongoose.connect(url, {
//     useNewUrlParser: true
//   })
//   /* istanbul ignore next */
//   .then(() => {
//     console.log('connected to MongoDB');
//   })
//   /* istanbul ignore next */
//   .catch(err => {
//      /* istanbul ignore next */
//     console.log(err)
//   })


const Alarm = require('./models/alarm')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const CronJob = cron.CronJob

const job = new CronJob('* * * * *', async function () {
    let currentTime = new Date()
    console.log("Running every minute", moment(currentTime).format('hh:mm:ss'))
    // try {
    //     let alarms = await Alarm.find({
    //         days: moment(currentTime).format('dddd'),
    //         time: moment(currentTime).format('LT'),
    //         status: true
    //     })
    //     console.log(alarms)
    //     // for (let i = 0; i < alarms.length; i++) {
    //     //     let question = await Question.find({ owner: alarms[i]._id })
    //     //     let answer = await Answer.find({ owner: alarms[i]._id })
    //     //     queue.create('sendmail', {
    //     //         email: alarms[i].email,
    //     //         teks: 'Your activity:\nYou have asked '+question.length+' time(s)\nYou have answered '+answer.length+' time(s)',
    //     //     }).save()
    //     // }
    // }
    // catch (err) {
    //     console.log(err)
    // }
}, null, true)

app.listen(port, function () {
    console.log('Listening to port ' + port)
})

module.exports = app