/* 
  mongoose.js ：建立数据库连接
 */
var mongoose = require('mongoose') // 引入 mongoose
mongoose.set('useCreateIndex', true);

var url = "mongodb://gelin:gelin2019@94.191.74.229:27017/gelin"; //该地址格式：mongodb://[username:password@]host:port/database[?options]
mongoose.connect(url, {useNewUrlParser: true});

// connect() 返回一个状态待定（pending）的连接，可以用来判断连接成功或失败
var db = mongoose.connection;
db.on('error', function callback() { //监听是否有异常
    console.log("Connection error");
});
db.once('open', function callback() { //监听一次打开
    //在这里创建你的模式和模型
    console.log('connected!');
});
 
module.exports = mongoose;