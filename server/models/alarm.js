const mongoose = require('mongoose')

const {Schema} = mongoose
const alarmSchema = new Schema({
  user : { type: Schema.Types.ObjectId, ref: 'User'},
  title: String,
  time: String,
  originTime: String,
  days: [{type: String}],
  status: Boolean,
  fcmToken: String
})
const Alarm = mongoose.model('alarm', alarmSchema)
module.exports = Alarm