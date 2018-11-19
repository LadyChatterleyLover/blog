const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  // 摘要
  abstract: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  // 类目
  category: {
    type: String,
    required: true
  },
  //来源
  source: {
    type: String,
    required: true
  },
  // 重要性
  star: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: String,
  }
})

module.exports = Article= mongoose.model('Article', ArticleSchema)
