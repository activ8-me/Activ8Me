const moment = require('moment')

console.log(moment().format('LT'))
console.log(moment().add(10, 'minutes').format('LT'))