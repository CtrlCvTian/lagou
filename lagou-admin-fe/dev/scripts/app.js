/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("let HomeTpl = __webpack_require__(/*! ./views/home.html */ \"./src/scripts/views/home.html\");\r\nlet PositionTpl = __webpack_require__(/*! ./views/position.html */ \"./src/scripts/views/position.html\");\r\nlet PositionAddTpl = __webpack_require__(/*! ./views/position_add.html */ \"./src/scripts/views/position_add.html\");\r\nlet updateTpl = __webpack_require__(/*! ./views/position_update.html */ \"./src/scripts/views/position_update.html\");\r\n$(\".content\").html(HomeTpl);\r\n//点击左侧侧边栏实现点击切换\r\n$(\".sidebar-menu\").on(\"click\", \"li\", function(){\r\n    $(this).addClass(\"active\").siblings().removeClass(\"active\");\r\n    var link = $(this).attr(\"link\");\r\n    if (link === \"home\"){\r\n        $(\".content\").html(HomeTpl);\r\n    }else{\r\n        findAll();\r\n    }\r\n})\r\n//点击添加按钮  事件委托\r\n$(\".content\").on(\"click\", \"#addbtn\", function(){\r\n    //显示添加职位的模板\r\n    $(\".content\").html(PositionAddTpl);\r\n})\r\n//点击返回页面\r\n$(\".content\").on(\"click\", \"#posback\", function () {\r\n    //显示所有职位的模板\r\n    findAll();\r\n})\r\n//点击提交  \r\n$(\".content\").on(\"click\", \"#possubmit\", function () {\r\n    //点击插入\r\n    //配置选项\r\n    let options = {\r\n        resetFrom: true,  //添加失败将输入内容清空\r\n        dataType:\"json\",\r\n        success: function (data) { //获取到的是字符串\r\n            if (data.result) {\r\n                findAll();\r\n            } else {\r\n                alert(\"职位操作失败\");\r\n            }\r\n        }\r\n    }\r\n    $(\"#possave\").ajaxSubmit(options); //进行提交\r\n    /* var data = $(\"form\").serialize();\r\n    var link = $(this).attr(\"link\");\r\n    //需要判断是更新还是插入\r\n    let url = link === \"add\" ? \"/api/position/add\" : \"/api/position/update\";\r\n    $.ajax({\r\n        type: \"POST\",\r\n        url: url,\r\n        data,\r\n        dataType: \"json\",\r\n        success: function(data){ //获取到的是字符串\r\n            console.log(data);\r\n            if(data.result){\r\n                findAll();\r\n            }else{\r\n                alert(\"职位操作失败\");\r\n            }\r\n        },\r\n        error: function(msg){\r\n            console.log(msg);\r\n        }\r\n    }) */\r\n})\r\n//获取某一条的数据  /api/position/findOne\r\n$(\".content\").on(\"click\", \".pos-edit\", function () {\r\n    var posId = $(this).attr(\"posid\");\r\n    //http:localhost:3000/api/position/:id\r\n    $.ajax({\r\n        url: \"/api/position/\" + posId,\r\n        dataType: \"json\",\r\n        success: function(obj){\r\n            if (obj.result){\r\n                //使用artTemplate模板渲染进行展示\r\n                var html = template.render(updateTpl, {\r\n                    data: obj.data\r\n                })\r\n                $(\".content\").html(html);\r\n            }\r\n        }\r\n    })\r\n})\r\n//删除某一条数据\r\n$(\".content\").on(\"click\", \".pos-remove\", function(){\r\n    var flag = confirm(\"确认要删除吗?\");\r\n    if (!flag){\r\n        return false;\r\n    } else {\r\n        let posId = $(this).attr(\"posId\");\r\n        /* \r\n        $.ajax({\r\n            url: \"/api/position/deleteOne/\" + posId,\r\n            dataType: \"json\",\r\n            success: function (data) {\r\n                if (data.result) {\r\n                    findAll();\r\n                }\r\n            }\r\n        }) */\r\n        //另一个接口进行删除数据\r\n        $.ajax({\r\n            url: \"/api/position/remove\",\r\n            data: {\r\n                id: posId\r\n            },\r\n            type: \"delete\",\r\n            dataType: \"json\",\r\n            success: function(data){\r\n                //重新渲染模板\r\n                findAll();\r\n            }\r\n        })\r\n    }\r\n})\r\n//点击进行模糊查询\r\n$(\".content\").on(\"click\", \"#possearch\", function(){\r\n    //获取输入框中的数据  去除多余空格\r\n    var keywords = $(\"input[name='pos_search']\").val().trim();\r\n    //   /api/position/query\r\n    $.ajax({\r\n        type: \"post\",\r\n        dataType: \"json\",\r\n        data: {\r\n            keywords\r\n        },\r\n        url: \"/api/position/query\",\r\n        success: function(obj){\r\n            if (obj.result){\r\n                //使用artTemplate渲染模板\r\n                var html = template.render(PositionTpl, {\r\n                    data: obj.data\r\n                })\r\n                $(\".content\").html(html);\r\n            }\r\n        }\r\n    })\r\n})\r\n//查询全部的数据的api接口  /api/position/find\r\nfunction findAll(){\r\n    $.ajax({\r\n        url: \"/api/position/find\",\r\n        dataType: \"json\",\r\n        success: (obj)=>{\r\n            //2、\r\n            if(obj.result){\r\n                //使用artTemplate模板实现职位展示的模板\r\n                var html = template.render(PositionTpl, {\r\n                    data: obj.data\r\n                })\r\n                $(\".content\").html(html);\r\n            }\r\n        },\r\n        error: (msg)=>{\r\n            console.log(msg);\r\n        }\r\n    })\r\n}\n\n//# sourceURL=webpack:///./src/scripts/app.js?");

/***/ }),

/***/ "./src/scripts/views/home.html":
/*!*************************************!*\
  !*** ./src/scripts/views/home.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"home\\\">    <h3>拉勾网采用node.js+Express+mongdb技术搭建</h3></div>\"\n\n//# sourceURL=webpack:///./src/scripts/views/home.html?");

/***/ }),

/***/ "./src/scripts/views/position.html":
/*!*****************************************!*\
  !*** ./src/scripts/views/position.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"box\\\">    <div class=\\\"box-header with-border\\\">        <h3 class=\\\"box-title\\\">            <button id=\\\"addbtn\\\" class=\\\"btn btn-block btn-success\\\"><span class=\\\"fa fa-plus\\\"></span> 添加</button>        </h3>        <div class=\\\"box-tools\\\">            <div class=\\\"input-group input-group-sm\\\" style=\\\"width: 150px;\\\">                <input type=\\\"text\\\" value=\\\"\\\" name=\\\"pos_search\\\" class=\\\"form-control pull-right\\\" placeholder=\\\"搜索\\\">                <div class=\\\"input-group-btn\\\">                    <button type=\\\"button\\\" id=\\\"possearch\\\" class=\\\"btn btn-default\\\"><i class=\\\"fa fa-search\\\"></i></button>                </div>            </div>        </div>    </div>    <!-- /.box-header -->    <div class=\\\"box-body\\\">        <table class=\\\"table table-bordered\\\">            <tr class=\\\"tr-first\\\">                <th style=\\\"width: 10px\\\">#</th>                <th>公司Logo</th>                <th>公司名称</th>                <th>职位名称</th>                <th>工作地点</th>                <th>发布时间</th>                <th>岗位薪资</th>                <th style=\\\"width: 140px\\\">操作</th>            </tr>            {{each data}}            <tr>                <td>{{$index + 1}}</td>                <td><img width=\\\"50\\\" height=\\\"50\\\"                        src=\\\"http://localhost:3000/upload/{{$value.companyLogo}}\\\" alt=\\\"\\\">                </td>                <td>{{$value.companyName}}</td>                <td>{{$value.positionName}}</td>                <td>{{$value.city}}</td>                <td>{{$value.createTime}}</td>                <td>{{$value.salary}}</td>                <td class=\\\"row\\\">                    <button class=\\\"btn btn-sm btn-primary pos-edit col-md-6\\\" posid=\\\"{{$value._id}}\\\"><span                            class=\\\"fa fa-edit\\\"></span> 修改</button>                    <button class=\\\"btn btn-sm btn-danger pos-remove col-md-6\\\" posid=\\\"{{$value._id}}\\\"                        filename=\\\"{{$value.companyLogo}}\\\"><span class=\\\"fa fa-remove\\\"></span> 删除</button>                </td>            </tr>            {{/each}}            <!-- <tr>          <td colspan=\\\"8\\\">暂无记录。</td>        </tr> -->        </table>    </div></div><!-- /.box -->\"\n\n//# sourceURL=webpack:///./src/scripts/views/position.html?");

/***/ }),

/***/ "./src/scripts/views/position_add.html":
/*!*********************************************!*\
  !*** ./src/scripts/views/position_add.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"box box-info\\\">  <div class=\\\"box-header with-border\\\">    <h3 class=\\\"box-title\\\">职位添加</h3>  </div>  <!-- /.box-header -->  <!-- form start -->  <form class=\\\"form-horizontal\\\" id=\\\"possave\\\" action=\\\"/api/position/add\\\" method=\\\"post\\\" enctype=\\\"multipart/form-data\\\">    <div class=\\\"box-body\\\">      <div class=\\\"form-group\\\">        <label for=\\\"companyLogo\\\" class=\\\"col-sm-2 control-label\\\">公司Logo</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"file\\\" class=\\\"form-control\\\" name=\\\"companyLogo\\\" id=\\\"companyLogo\\\" placeholder=\\\"请选择公司logo图片\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"companyName\\\" class=\\\"col-sm-2 control-label\\\">公司名称</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"companyName\\\" id=\\\"companyName\\\" placeholder=\\\"请输入公司名称\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"positionName\\\" class=\\\"col-sm-2 control-label\\\">职位名称</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"positionName\\\" id=\\\"positionName\\\" placeholder=\\\"请输入职位名称\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"city\\\" class=\\\"col-sm-2 control-label\\\">工作地点</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"city\\\" id=\\\"city\\\" placeholder=\\\"请输入工作地点\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"salary\\\" class=\\\"col-sm-2 control-label\\\">岗位薪资</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"salary\\\" id=\\\"salary\\\" placeholder=\\\"请输入岗位薪资\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"type\\\" class=\\\"col-sm-2 control-label\\\">工作性质</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"type\\\" id=\\\"type\\\" placeholder=\\\"请输入工作性质\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"experience\\\" class=\\\"col-sm-2 control-label\\\">工作经验</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"experience\\\" id=\\\"experience\\\" placeholder=\\\"请输入工作经验\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"degree\\\" class=\\\"col-sm-2 control-label\\\">学历要求</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"degree\\\" id=\\\"degree\\\" placeholder=\\\"请输入学历要求\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"description\\\" class=\\\"col-sm-2 control-label\\\">职位描述</label>        <div class=\\\"col-sm-10\\\">          <textarea rows=\\\"8\\\" cols=\\\"80\\\" name=\\\"description\\\" class=\\\"form-control\\\" id=\\\"description\\\" placeholder=\\\"请输入职位描述\\\"></textarea>        </div>      </div>    </div>    <!-- /.box-body -->    <div class=\\\"box-footer\\\">      <button type=\\\"button\\\" id=\\\"posback\\\" class=\\\"btn btn-default\\\">返回</button>      <button link=\\\"add\\\" type=\\\"button\\\" id=\\\"possubmit\\\" class=\\\"btn btn-info pull-right\\\">提交</button>    </div>    <!-- /.box-footer -->  </form></div>\"\n\n//# sourceURL=webpack:///./src/scripts/views/position_add.html?");

/***/ }),

/***/ "./src/scripts/views/position_update.html":
/*!************************************************!*\
  !*** ./src/scripts/views/position_update.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"box box-info\\\">  <div class=\\\"box-header with-border\\\">    <h3 class=\\\"box-title\\\">职位修改</h3>  </div>  <!-- /.box-header -->  <!-- form start -->  <form class=\\\"form-horizontal\\\" id=\\\"possave\\\" action=\\\"/api/position/update\\\" method=\\\"post\\\" enctype=\\\"multipart/form-data\\\">    <div class=\\\"box-body\\\">      <div class=\\\"form-group\\\">        <label for=\\\"companyLogo\\\" class=\\\"col-sm-2 control-label\\\">公司Logo</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"file\\\" class=\\\"form-control\\\" name=\\\"companyLogo\\\" id=\\\"companyLogo\\\" placeholder=\\\"请选择公司logo图片\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"companyName\\\" class=\\\"col-sm-2 control-label\\\">公司名称</label>        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.companyName}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"companyName\\\" id=\\\"companyName\\\" placeholder=\\\"请输入公司名称\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"positionName\\\" class=\\\"col-sm-2 control-label\\\">职位名称</label>        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.positionName}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"positionName\\\" id=\\\"positionName\\\" placeholder=\\\"请输入职位名称\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"city\\\" class=\\\"col-sm-2 control-label\\\">工作地点</label>        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.city}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"city\\\" id=\\\"city\\\" placeholder=\\\"请输入工作地点\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"salary\\\" class=\\\"col-sm-2 control-label\\\">岗位薪资</label>        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.salary}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"salary\\\" id=\\\"salary\\\" placeholder=\\\"请输入岗位薪资\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"type\\\" class=\\\"col-sm-2 control-label\\\">工作性质</label>        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.type}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"type\\\" id=\\\"type\\\" placeholder=\\\"请输入工作性质\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"experience\\\" class=\\\"col-sm-2 control-label\\\">工作经验</label>        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.experience}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"experience\\\" id=\\\"experience\\\" placeholder=\\\"请输入工作经验\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"degree\\\" class=\\\"col-sm-2 control-label\\\">学历要求</label>        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.degree}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"degree\\\" id=\\\"degree\\\" placeholder=\\\"请输入学历要求\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"description\\\" class=\\\"col-sm-2 control-label\\\">职位描述</label>        <div class=\\\"col-sm-10\\\">          <textarea rows=\\\"8\\\" cols=\\\"80\\\" name=\\\"description\\\" class=\\\"form-control\\\" id=\\\"description\\\" placeholder=\\\"请输入职位描述\\\">{{data.description}}</textarea>        </div>      </div>    </div>    <!-- /.box-body -->    <div class=\\\"box-footer\\\">      <button type=\\\"button\\\" id=\\\"posback\\\" class=\\\"btn btn-default\\\">返回</button>      <button link=\\\"update\\\" type=\\\"button\\\" id=\\\"possubmit\\\" class=\\\"btn btn-info pull-right\\\">提交</button>    </div>    <!-- /.box-footer -->    <input hidden name=\\\"id\\\" value=\\\"{{data._id}}\\\">  </form></div>\"\n\n//# sourceURL=webpack:///./src/scripts/views/position_update.html?");

/***/ })

/******/ });