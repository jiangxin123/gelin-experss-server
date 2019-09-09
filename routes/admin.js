var express = require('express');
var router = express.Router();
var sign = require('../model/sign');
var moment = require('moment');


router.post('/user/login', function(req, res, next) {
  const data = req.body
  // if (data) {
  //   sign.find((err, value) => {
  //     console.log(value)
  //   })
  // } else {
  //   res.json({
  //     success: false,
  //     message: "接口数据异常"
  //   })
  // }
  res.json({
    success: true,
    message: "登录成功",
    data: {
      token: 'admin-token'
    }
  })
});

router.get('/user/info', function(req, res, next) {
  const data = req.query
  // if (data) {
  //   sign.find((err, value) => {
  //     console.log(value)
  //   })
  // } else {
  //   res.json({
  //     success: false,
  //     message: "接口数据异常"
  //   })
  // }
  res.json({
    success: true,
    message: "登录成功",
    data: {
      roles: ['admin'],
      introduction: '我是超级管理员',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Admin'
    }
  })
});

router.post('/sign/list', function(req, res, next) {
  const data = req.body
  if (data) {
    var query = sign.find({}).sort({ creatTime: 'desc'}).lean()

    if(data.search) {
      if (data.search.name) {
        query.where({name: `/${data.search.name}/`})
      }
    }
    query.exec((err, value) => {
      if (!err) {
        if (value && value.length) {
          value.forEach((item, i) => {
            item.creatTime = moment(item.creatTime).format('YYYY-MM-DD HH:mm:ss')
          })
        }
        res.json({
          success: true,
          message: "操作成功",
          data: value
        })
      }
    })
    // console.log(query)
    // var Sign = mongoose.model('Sign', sign)
    // console.log(Sign)
    // sign.find((err, value) => {
    //   console.log(value)
    // })
  } else {
    res.json({
      success: false,
      message: "接口数据异常"
    })
  }
});

module.exports = router;
