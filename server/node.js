const moment = require('moment')

console.log(moment().format('LT'))
console.log(new Date(moment("08:00 AM", ["h:mm A"])))