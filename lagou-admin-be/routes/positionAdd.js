const express = require("express");
//引入添加职位的controller
const PosAdd = require("../controller/posController");
//引入上传文件的中间件
const upload = require("../mildware/uploadfile");
//创建路由对象
const PosAddRouter = express.Router();
//http://localhost:3000/api/position/add 实现这个接口
//express 不是一个完整的MVC架构,m-model(数据库)  v - view(视图层)  
//c- conrtroller(中间件)  处理逻辑(主要是安排什么做什么) 单独抽离
PosAddRouter.post("/add", upload.uploadFile, PosAdd.add); 
//执行完上传文件的中间件，才去执行入库的操作
PosAddRouter.get("/find", PosAdd.find);
PosAddRouter.get("/:id", PosAdd.findById);
PosAddRouter.post("/update", upload.uploadFile, PosAdd.update); //http:localhost:3000/api/positions/动态的id
PosAddRouter.post("/query", PosAdd.query); //http:localhost:3000/api/query
PosAddRouter.get("/deleteOne/:id", PosAdd.deleteOne); //http:localhost:3000/api/positions/delete/动态的id
PosAddRouter.delete("/remove", PosAdd.remove); //http:localhost:3000/api/positions/remove
//导出这个路由对象
module.exports = PosAddRouter;