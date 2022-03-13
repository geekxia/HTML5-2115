const mongoose = require('mongoose')

module.exports =  mongoose.model('goods', mongoose.Schema({
  name: String,
  desc: String,
  img: String,
  price: Number,
  cate: String,
  hot: { type: Boolean, default: false },
  rank: { type: Number, default: 0 },
  create_time: Number,
  status: { type: Number, default: 1 }
}))
