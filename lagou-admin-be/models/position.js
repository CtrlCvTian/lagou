//M层   数据层
//引入db-utils，引入连接
const db = require("../utils/db-utils");
//创建规范
const PositionSchema = new db.Schema({
    city: { type: String, required: true },
    companyName: { type: String, required: true },
    degree: { type: String, required: true },
    description: { type: String, required: true },
    experience: { type: String, required: true },
    positionName: { type: String, required: true },
    salary: { type: String, required: true },
    type: { type: String, required: true },
    createTime: {type: String, required: true},
    companyLogo: { type: String, required: true }
})
//创建集合  添加文档
const Positions = db.model("positions", PositionSchema);
module.exports = Positions;
//实现添加职位
const save = (data) => {
    //创建实例对象
    let position = new Positions(data);  //data是需要创建的数据
    //save返回promise对象
    return position.save().then((res)=>{
        return true;
    }).catch((err)=>{
        return false;
    })
    //方法一：这个方法没有返回值,  undefined
    /* Positions.insertMany(data, (err)=>{
        if(!err){
            console.log("插入成功");
        }else{
            console.log("插入失败");
        }
    }) */
}
//查询全部的职位
const find = ()=>{
    return Positions.find();
}
//查询单个的职位
const findById = (id) => {
    return Positions.findById(id);
}
//根据具体的ID更新一条数据   findOneAndUpdate
const findByIdAndUpdate = (id, data)=>{
    return Positions.findOneAndUpdate({_id: id}, data)
    // return Positions.findByIdAndUpdate(id, data);
}
//根据ID删除某一条数据
const deleteOne = (id)=>{
    return Positions.deleteOne({ _id: id });
}
//根据ID删除一条数据
const findByIdAndDelete = (id)=>{
    return Positions.findByIdAndDelete(id)
        .then(()=>{
            return true;
        }).catch(()=>{
            return false;
        });
}
//模糊查询数据
const query = (keywords)=>{
    return Positions.find({
        positionName: new RegExp(keywords, "ig")
    })
}
module.exports = {
    save,
    find,
    findById,
    findByIdAndUpdate,
    deleteOne,
    findByIdAndDelete,
    query
}
