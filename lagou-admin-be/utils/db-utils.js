//引入模块
const mongoose = require("mongoose");
//建立连接
mongoose.connect("mongodb://127.0.0.1:27017/lagou", { useNewUrlParser: true });
//导出模块
module.exports = mongoose;