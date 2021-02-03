// const express = require('express')
// let app = express()
// var mysql=require('mysql')
var mysqlAll = require('../common/mysqlAll.js') //sql语法汇总
var mysqlSetting = require('../common/setting.js')
var messageAjax = require('../common/messageAjax.js') //提示语

var async = require('async') //调用数据库同步方法
var loggerContent = require('../common/logger.js') //日志
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
	// let sql = "SELECT * FROM user WHERE id>=?"

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

exports.setUser = function(req, res, next) {

	// req.query 获取get，
	// req.body 获取post
	// console.log(req.body, 'body')
loggerContent.createLog('test','error',{labelOptions:{label:'我是测试页面error111'}});
///loggerContent.loggers.get('testError','pppp');
//logerr.error(1,'参数2');
	var user = req.body
	// 该参数是获取图形验证码的session
	if (req.session.captcha != user.yzm) {
		return res.json({
			code: 400,
			msg: messageAjax.USER_MSG.E_YZM,
			// msg:'11',
		});
	}

	async.series({
		one: function(cb) {
			// 查询数据库
			mysqlSetting.connection.query(mysqlAll.USER_ALL.USER_SELECT, [user.name, user.phone, user.email], function(err,
				result) {
				if (err) {
					return res.json({
						code: 400,
						data: err,
						msg: '网络错误',
					});
				} else {
					console.log(result)
					if (result.length > 0) {
						// 如果存在跳出，提示手机号，用户名或者邮箱重复,回调的err则是提示内容
						cb(messageAjax.USER_MSG.SEL_PEN)
					} else {
						cb(null)
					}
				}
			});





		},
		two: function(cb) {
			mysqlSetting.connection.query(mysqlAll.USER_ALL.USER_SET, [user.name, user.pwd, user.email, user.phone,user.imageUrl,create_time, updata_time
			], function(err, result) {
				// console.log(result,'result')
				if (err) {
					cb(messageAjax.USER_MSG.ERR_NOTWORK)
					// return res.json({
					// 	code: 400,
					// 	data: err,
					// 	msg: '网络错误',
					// });
				} else {
					cb(null)
					// res.json({
					// 	code: 200,
					// 	data: result,
					// 	msg: messageAjax.USER_MSG.SET_USER,
					// });
				}
			});


		}
	}, function(err, results) {
		console.log(err, results);
		//winston.loggers.add('testDebugklp', createLog('testklp','debug',{labelOptions:{label:'我是测试页面debug'}}));
		//loggerContent.loggers.add('testDebug', createLog('test','debug',{labelOptions:{label:'用户新增失败'}}));
		
		if (err) {
			//winston.apiRequestLogger(req, res, next)
			//loggerContent.loggers.add('testDebug', createLog('test','debug',{labelOptions:{label:'用户新增失败'}}));
			return res.json({
				code: 400,
				msg: err,
			});
		} else {
			return res.json({
				code: 200,
				msg: '数据插入成功',
			});
		}

	})



	//获取创建时间和更新时间
	var create_time = parseInt(new Date().getTime()) / 1000
	var updata_time = create_time





	//请勿开启，开启后接口调用第二次调用会出现错误
	// connection.end();


}
