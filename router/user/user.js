// const express = require('express')
// let app = express()
// var mysql=require('mysql')
var mysqlAll = require('../common/mysqlAll.js') //sql语法汇总
var mysqlSetting = require('../common/setting.js')
var messageAjax = require('../common/messageAjax.js') //提示语
// var connection = mysql.createConnection({

// 	host: "localhost",
// 	port: '3306',
// 	user: "root",
// 	password:"kLP551319zxc",
// 	ssl  : {
// 	    // DO NOT DO THIS
// 	    // set up your ca correctly to trust the connection
// 	    rejectUnauthorized: false,

// 	  },
// 	 serverTimezone:'UTC',
// 	 database: "admin",//表明
// 	 connectionLimit : 10,
// 	 long_password:'on',


// 	debug:true

// })
//single是单图片上传，多图片上传 array ,single里面就是上传图片的key值 
//和图片相关的是req.file 
exports.userList = function(req, res, next) {
	// console.log(messageAjax.USER_MSG.LOGIN,'ppp')
	console.log(req.session.captcha, 'req.session.captcha')
	// req.query 获取get，
	// req.body 获取post
	console.log(req.body, 'body')

	var user = req.query
	// 该参数是获取图形验证码的session

	//console.log(res.query,'body111')
	// 占位符号按顺序放入，代表相应的字段
	let sql = "SELECT * FROM user WHERE id>=?"

	mysqlSetting.connection.query(mysqlAll.USER_ALL.USER_LIST, [0], function(err, result) {
		console.log(result, 'result')
		if (result.length > 0) {

			res.json({
				code: 200,
				data: result,
				msg: messageAjax.USER_OK,
			});


		} else {
			res.json({
				code: 400,
				msg: messageAjax.USER_MSG.USER_EROR,
			});
		}

	});

	//请勿开启，开启后接口调用第二次调用会出现错误
	// connection.end();


}

function setSelect(req,res,next) {

	var user = req.body
	// 该参数是获取图形验证码的session
	mysqlSetting.connection.query(mysqlAll.USER_ALL.USER_SELECT, [user.name, user.phone], function(err, result) {
		// console.log(result,'result')
		if (err) {
			return res.json({
				code: 400,
				data: err,
				msg: '网络错误',
			});
		} else {
			// console.log(result,'result')
			return result 
			// res.json({
			// 	code: 200,
			// 	data: result,
			// 	msg: '数据查询存在',
			// });
		}
	});
}

exports.setUser = function(req, res, next) {
	console.log(req.session.captcha, 'req.session.captcha')
	// req.query 获取get，
	// req.body 获取post
	// console.log(req.body, 'body')

	var user = req.body
	// 该参数是获取图形验证码的session
	if (req.session.captcha != req.body.yzm) {
		return res.json({
			code: 400,
			msg: messageAjax.USER_MSG.E_YZM,
			// msg:'11',
		});
	}
	//获取创建时间和更新时间
	var create_time = parseInt(new Date().getTime()) / 1000
	var updata_time = create_time
	let selData=setSelect(req, res, next)
	
console.log(selData,'setUser')
	if (selData) {
		return res.json({
			code: 400,
			data: selData,
			msg: messageAjax.USER_MSG.SEL_PEN,
			// msg:'11',
		});
	}
	mysqlSetting.connection.query(mysqlAll.USER_ALL.USER_SET, [user.name, user.pwd, user.email, user.phone, create_time,
		updata_time
	], function(err, result) {
		// console.log(result,'result')
		if (err) {

			return res.json({
				code: 400,
				data: err,
				msg: '网络错误',
			});
		} else {

			res.json({
				code: 200,
				data: result,
				msg: messageAjax.USER_MSG.SET_USER,
			});
		}





	});

	//请勿开启，开启后接口调用第二次调用会出现错误
	// connection.end();


}
