const mongoose = require('mongoose')

const {Schema} = mongoose
const alarmSchema = new Schema({
  user : { type: Schema.Types.ObjectId, ref: 'User'},
  title: String,
  time: String,
  originTime: String,
  days: [{type: String}],
  status: Boolean
})
const Article = mongoose.model('article',alarmSchema)
module.exports = Article