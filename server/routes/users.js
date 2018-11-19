const router = require('koa-router')()
const mongoose = require('mongoose')
const User = require('../models/User')

router.prefix('/users')

router.get('/', async (ctx, next) => {
  ctx.body = 'this is a users response!'
})

// 注册登录
router.post('/register', async (ctx) => {
  let newUser = new User(ctx.request.body)
  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})


// 读取访客
router.get('/visitor', async (ctx) => {
  await User.find().then((user) => {
    ctx.body = {
      code: 200,
      data: user
    }
  }).catch(error => {
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

module.exports = router
