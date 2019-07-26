const router = require('express').Router()
const alarmRoutes = require('./alarm')
const userRoutes = require('./user')

router.use('/user',userRoutes)
router.use('/alarm',alarmRoutes)

module.exports = router