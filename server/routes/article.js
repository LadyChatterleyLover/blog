const router = require('koa-router')()
// const mongoose = require('mongoose')
const Article = require('../models/Article')
const multer = require('koa-multer')//加载koa-multer模块
router.prefix('/article')
let ObjectID = require('mongodb').ObjectID
const fs = require('fs')

router.post('/create', async (ctx) => {
  let newArticle = new Article(ctx.request.body)
  await newArticle.save().then(() => {
    ctx.body = {
      code: 200,
      data: '创建成功'
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

router.get('/allArticle', async (ctx) => {
  await Article.find().sort({date: 1}).then(article => {
    ctx.body = {
      code: 200,
      data: article
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

router.post('/article', async (ctx) => {
  await Article.findOne({
    _id: ObjectID(ctx.request.body._id)
  }).exec().then(article => {
    ctx.body = {
      code: 200,
      data: article
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");  //以点分割成数组，数组的最后一项就是后缀名
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
var upload = multer({storage: storage});
//路由
router.post('/upload', upload.single('file'), async (ctx, next) => {
  console.log('abc')
  ctx.body = {
    data: ctx.request//返回文件名
  }
})


// 删除文章
router.post('/delete', async (ctx) => {
  await Article.remove({
    _id: ObjectID(ctx.request.body._id)
  }).then(article => {
    ctx.body = {
      code: 200,
      data: article
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

// 编辑文章
router.post('/update', async ctx => {
  console.log(ctx.request.body)
  const _id = ctx.request.body.id
  let d = new Date(ctx.request.body.date)
  let times = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分' + d.getSeconds() + '秒'
  console.log(times)
  await Article.findByIdAndUpdate(_id,
    {
      title: ctx.request.body.title,
      abstract: ctx.request.body.abstract,
      author: ctx.request.body.author,
      category: ctx.request.body.category,
      source: ctx.request.body.source,
      star: ctx.request.body.star,
      text: ctx.request.body.text,
      date: times
    }).then(res => {
    ctx.body = {
      data: res,
      success: true,
    }
  }).catch(err => {
    ctx.body = {
      message: err
    }
  })

})

module.exports = router
