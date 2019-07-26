const router = require('express').Router()
const user = require('../controllers/user')

router.post('/signUp', user.signUp)
router.post('/signIn', user.signIn)

module.exports = router