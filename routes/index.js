var express = require('express');
var router = express.Router();
var sign = require('../model/sign');
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/hello', function(req, res, next) {
  const data = req.body
  if (data) {
    const creatTime = new Date()
    data.creatTime = creatTime
    if (!data.phone) {
      res.json({
        success: false,
        message: "手机号不能为空"
      })
    } else {
      const signData = new sign(data)
      sign.findOne({
        phone: data.phone
      }).then(user => {
        if (user) {
          res.json({
            success: false,
            message: "手机号已经提交，请不要重复预约"
          })
        } else {
          signData.save((err, user) => {
            if (err) {
              res.json(err)
            } else {
              res.json({
                success: true,
                message: "提交成功"
              })
            }
          })
        }
      })
    }
  } else {
    res.json({
      success: false,
      message: "接口数据异常"
    })
  }
});

module.exports = router;
