const Alarm = require('../models/alarm')

class AlarmCont {
  static create (req, res, next) {
    let newAlarm = {
      user: req.decoded._id,
      time: req.body.time,
      days: req.body.days,
      originTime: req.body.time 
    }
    Alarm.create(newAlarm)
    .then(alarm => {
      res.status(201).json(alarm)
    })
    .catch(next)
  }
  
  static list (req, res, next) {
    Alarm.find({user: req.decoded._id}).exec(function (err, alarms) {
      if (err) {
        next ({code: 500, message: err.message})
      } else {
        if (alarms) {
          res.status(200).json(alarms)
        } else {
          res.status(200).json([])
        }
      }
    })
  }
  
  static update (req, res, next) {
    Alarm.findById(req.params.id, (err, alarm) => {
      if (err) {
        next({code: 500, message: err.message})
      } else {
        if (alarm) {
          if (req.body.type === 'reset') {
            alarm.time = alarm.originTime
          } else if (req.body.type === 'snooze') {
            alarm.time = req.body.time
          } else if (req.body.type === 'update') {
            alarm.time = req.body.time
            alarm.originTime = req.body.time
            alarm.days = req.body.days
          }
          alarm.save()
          .then (alarm => {
            res.status(200).json(alarm)
          })
          .catch(next)
        } else {
          next({code: 404, message: `Alarm with id ${req.params.id} not found!`})
        }
      }
    })
  }
  
  static delete (req, res, next) {
    Alarm.deleteOne({ _id: req.params.id })
    .then(result =>{
      res.status(200).json(result)
    })
    .catch(next)
  }
}

module.exports = AlarmCont