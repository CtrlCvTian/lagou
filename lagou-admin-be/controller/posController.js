//引入时间格式化的模块
const moment = require('moment');
//添加职位的controller层
//引入职位 的M 层
const positons = require("../models/position"); //需要开启mongoose数据库服务
//添加职位
const add = async (req, res, next) => {
    req.body.createTime = moment().format("YYYY-MM-DD HH:mm");
    req.body.companyLogo = req.fileName;//获取req中的文件名称 fileName
    //调用插入方法
    let flag = await positons.save(req.body);
    //根据flag的条件，返回对应的结果给前端
    if(flag) { //插入成功
        res.render("position_succ.ejs", {
            data: JSON.stringify({
                message: "success"
            })
        });
    }else{
        res.render("position_fail.ejs", {
            data: JSON.stringify({
                message: "fail"
            })
        });
    }
}
//查询全部的职位
const find = async (req, res, next)=>{
    let result = await positons.find();
    //查询完成
    //根据flag的条件，返回对应的结果给前端
    if (result) { //插入成功
        res.render("position_succ.ejs", {
            data: JSON.stringify(result)
        });
    } else {
        res.render("position_fail.ejs", {
            data: JSON.stringify({
                message: "fail"
            })
        });
    }
}
//查询一条数据
const findById = async (req, res, next) => {
    let result = await positons.findById(req.params.id);
    //根据flag的条件，返回对应的结果给前端
    if (result) { //插入成功
        res.render("position_succ.ejs", {
            data: JSON.stringify(result)
        });
    } else {
        res.render("position_fail.ejs", {
            data: JSON.stringify({
                message: "fail"
            })
        });
    }
}
//更新一条数据
const update = async (req, res, next) => {
    req.body.createTime = moment().format("YYYY-MM-DD HH:mm");
    req.body.companyLogo = req.fileName;//获取req中的文件名称 fileName
    let result = await positons.findByIdAndUpdate(req.body.id, req.body);
    //查询完成
    if (result) { //插入成功
        res.render("position_succ.ejs", {
            data: JSON.stringify(result)
        });
    } else {
        res.render("position_fail.ejs", {
            data: JSON.stringify({
                message: "fail"
            })
        });
    }
}
//删除一条数据
const deleteOne = async (req, res, next)=>{
    let result = await positons.deleteOne(req.params.id);
    //删除完成
    if (result.deletedCount) {
        res.render("position_succ.ejs", {
            data: JSON.stringify(result)
        });
    }else{
        res.render("position_fail.ejs", {
            message: "fail"
        });
    }
}
//删除一条数据
const remove = async (req, res, next)=>{
    let result = await positons.findByIdAndDelete(req.body.id);
    if (result) {
        res.render("position_succ.ejs", {
            data: JSON.stringify({
                message: "success"
            })
        });
    }
}
//模糊查询
const query = async (req, res, next)=>{
    let result = await positons.query(req.body.keywords);
    res.render("position_succ.ejs", {
        data: JSON.stringify(result)
    })
}
module.exports = {
    add,
    find,
    findById,
    update,
    deleteOne,
    remove,
    query
};