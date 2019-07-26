const mongoose = require('mongoose')

const {Schema} = mongoose
const articleSchema = new Schema({
  user : { type: Schema.Types.ObjectId, ref: 'User'},
  title: String,
  time: String,
  originTime: String,
  days: [{type: String}]
})
const Article = mongoose.model('article', articleSchema)
module.exports = Article