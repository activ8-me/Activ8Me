const router = require('express').Router()
const alarm = require('../controllers/alarm')
const auth = require('../middlewares/authenticate.js')
const autho = require('../middlewares/authorize')

router.use(auth)
router.get('/', alarm.list);
router.post('/', alarm.create);
router.patch('/:id', autho, alarm.update);
router.delete('/:id', autho, alarm.delete)

module.exports = router