const multer = require('multer');
const path = require("path");
//创建一个上传文件的中间件
const uploadFile = async (req, res, next)=>{
    //执行文件上传的操作
    var storage = multer.diskStorage({
        destination: function (req, file, cb) { 
            cb(null, path.resolve(__dirname, "../public/upload"))//要存在服务器上的路径
        },
        filename: function (req, file, cb) {
            //fileldname就是拿到表单里面name的属性值的这个字段
            let fn = file.originalname; //获取文件的全名
            let dot = path.extname(fn);
            var fileName = file.fieldname + "-" + new Date().getTime() + dot;
            //给下一个中间件传入companyLogo的属性和属性值,然后插入数据库
            req.fileName = fileName;
            //Date().now()  获取当前时间的时间戳 不能加new 
            cb(null, fileName);
        }
    })
    var upload = multer({ storage: storage }).single("companyLogo");
    upload(req, res, function(err){
        if(err){//上传失败
            res.render("position_fail.ejs", {
                data: JSON.stringify({
                    message: "fail"
                })
            });            
        } else {//上传图片成功
            next();//放行下个中间件add,进行入库操作
        }
    })
}
module.exports = {
    uploadFile
}