const Alarm = require('../models/alarm')

module.exports = (req, res, next) => {
  Alarm.findOne({
    _id: req.params.id
  })
  .then(alarm => {
    if (alarm) {
      if (alarm.user.equals(req.decoded._id)) {
        next()
      } else {
        next({
          code: 403,
          message: 'Unauthorized'
        })
      }
    } else
    next({
      code: 404,
      message: `Alarm with id ${req.params.id} not found!`
    })
  })
  .catch(next)
}