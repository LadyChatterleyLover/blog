const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('mongoose')
const koaBody = require('koa-body')
const formidable = require('koa-formidable') // 图片处理
const fs = require('fs') // 图片路径
const path = require('path') // 图片路径
const serve = require("koa-static")


const index = require('./routes/index')
const users = require('./routes/users')
const article = require('./routes/article')

// error handler
onerror(app)

// middlewares
app.use(serve(__dirname))

let mkdirs = (dirname, callback)=> {
  fs.exists(dirname, function(exists) {
    if (exists) {
      callback()
    } else {
      mkdirs(path.dirname(dirname), function() {
        fs.mkdir(dirname, callback)
      })
    }
  })
}


app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 200*1024*1024 // 设置上传文件大小最大限制，默认2M
  }
}))

app.use(bodyparser({
  formLimit:"3mb",
  jsonLimit:"3mb",
  textLimit:"3mb",
  enableTypes: ['json', 'form', 'text']
}))

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(article.routes(), article.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser:true},err => {
  if(err){
    console.log('Connection Error:' + err)
  }else{
    console.log('数据库连接成功!') }
})

module.exports = app
