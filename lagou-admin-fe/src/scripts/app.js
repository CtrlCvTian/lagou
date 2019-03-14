let HomeTpl = require("./views/home.html");
let PositionTpl = require("./views/position.html");
let PositionAddTpl = require("./views/position_add.html");
let updateTpl = require("./views/position_update.html");
$(".content").html(HomeTpl);
//点击左侧侧边栏实现点击切换
$(".sidebar-menu").on("click", "li", function(){
    $(this).addClass("active").siblings().removeClass("active");
    var link = $(this).attr("link");
    if (link === "home"){
        $(".content").html(HomeTpl);
    }else{
        findAll();
    }
})
//点击添加按钮  事件委托
$(".content").on("click", "#addbtn", function(){
    //显示添加职位的模板
    $(".content").html(PositionAddTpl);
})
//点击返回页面
$(".content").on("click", "#posback", function () {
    //显示所有职位的模板
    findAll();
})
//点击提交  
$(".content").on("click", "#possubmit", function () {
    //点击插入
    //配置选项
    let options = {
        resetFrom: true,  //添加失败将输入内容清空
        dataType:"json",
        success: function (data) { //获取到的是字符串
            if (data.result) {
                findAll();
            } else {
                alert("职位操作失败");
            }
        }
    }
    $("#possave").ajaxSubmit(options); //进行提交
    /* var data = $("form").serialize();
    var link = $(this).attr("link");
    //需要判断是更新还是插入
    let url = link === "add" ? "/api/position/add" : "/api/position/update";
    $.ajax({
        type: "POST",
        url: url,
        data,
        dataType: "json",
        success: function(data){ //获取到的是字符串
            console.log(data);
            if(data.result){
                findAll();
            }else{
                alert("职位操作失败");
            }
        },
        error: function(msg){
            console.log(msg);
        }
    }) */
})
//获取某一条的数据  /api/position/findOne
$(".content").on("click", ".pos-edit", function () {
    var posId = $(this).attr("posid");
    //http:localhost:3000/api/position/:id
    $.ajax({
        url: "/api/position/" + posId,
        dataType: "json",
        success: function(obj){
            if (obj.result){
                //使用artTemplate模板渲染进行展示
                var html = template.render(updateTpl, {
                    data: obj.data
                })
                $(".content").html(html);
            }
        }
    })
})
//删除某一条数据
$(".content").on("click", ".pos-remove", function(){
    var flag = confirm("确认要删除吗?");
    if (!flag){
        return false;
    } else {
        let posId = $(this).attr("posId");
        /* 
        $.ajax({
            url: "/api/position/deleteOne/" + posId,
            dataType: "json",
            success: function (data) {
                if (data.result) {
                    findAll();
                }
            }
        }) */
        //另一个接口进行删除数据
        $.ajax({
            url: "/api/position/remove",
            data: {
                id: posId
            },
            type: "delete",
            dataType: "json",
            success: function(data){
                //重新渲染模板
                findAll();
            }
        })
    }
})
//点击进行模糊查询
$(".content").on("click", "#possearch", function(){
    //获取输入框中的数据  去除多余空格
    var keywords = $("input[name='pos_search']").val().trim();
    //   /api/position/query
    $.ajax({
        type: "post",
        dataType: "json",
        data: {
            keywords
        },
        url: "/api/position/query",
        success: function(obj){
            if (obj.result){
                //使用artTemplate渲染模板
                var html = template.render(PositionTpl, {
                    data: obj.data
                })
                $(".content").html(html);
            }
        }
    })
})
//查询全部的数据的api接口  /api/position/find
function findAll(){
    $.ajax({
        url: "/api/position/find",
        dataType: "json",
        success: (obj)=>{
            //2、
            if(obj.result){
                //使用artTemplate模板实现职位展示的模板
                var html = template.render(PositionTpl, {
                    data: obj.data
                })
                $(".content").html(html);
            }
        },
        error: (msg)=>{
            console.log(msg);
        }
    })
}