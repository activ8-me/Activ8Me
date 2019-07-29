const Alarm = require('../models/alarm')

class AlarmCont {
  static create (req, res, next) {
    console.log('create')
    let newAlarm = {
      user: req.decoded._id,
      title: req.body.title,
      time: req.body.time,
      days: req.body.days,
      originTime: req.body.time,
      status: req.body.status 
    }
    Alarm.create(newAlarm)
    .then(alarm => {
      res.status(201).json(alarm)
    })
    .catch(next)
  }
  
  static list (req, res, next) {
    console.log('get')
    Alarm.find({user: req.decoded._id}).exec(function (err, alarms) {
      /* istanbul ignore next */
      if (err) {
        next ({code: 500, message: err.message})
      } else {
        res.status(200).json(alarms)        
      }
    })
  }
  
  static update (req, res, next) {
    console.log('update')
    Alarm.findById(req.params.id, (err, alarm) => {
      /* istanbul ignore next */
      if (err) {
        next({code: 500, message: err.message})
      } else {
        if (req.body.type === 'reset') {
          alarm.time = alarm.originTime
        } else if (req.body.type === 'snooze') {
          alarm.time = req.body.time
        } else if (req.body.type === 'update') {
          alarm.time = req.body.time
          alarm.originTime = req.body.time
          alarm.days = req.body.days
          alarm.title = req.body.title
          alarm.status = req.body.status
        }
        alarm.save()
        .then (alarm => {
          res.status(201).json(alarm)
        })
        .catch(next)
      }
    })
  }
  
  static delete (req, res, next) {
    console.log('delete')
    Alarm.deleteOne({ _id: req.params.id })
    .then(result =>{
      res.status(200).json(result)
    })
    .catch(next)
  }
}

module.exports = AlarmCont