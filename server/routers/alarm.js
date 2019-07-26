const router = require('express').Router()
const alarm = require('../controllers/alarm')
const auth = require('../middlewares/authenticate.js')
const autho = require('../middlewares/authorize')

router.use(auth)
router.get('/list', alarm.list);
router.post('/create', alarm.create);
router.patch('/update/:id', autho, alarm.update);
router.delete('/delete/:id', autho, alarm.delete)

module.exports = router