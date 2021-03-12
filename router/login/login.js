// const express = require('express')
// let app = express()
// var mysql=require('mysql')
var mysqlAll=require('../common/mysqlAll.js')//sql语法汇总
var mysqlSetting=require('../common/setting.js')
var messageAjax=require('../common/messageAjax.js')//提示语
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
exports.login=function(req,res,next){
	// console.log(messageAjax.USER_MSG.LOGIN,'ppp')
	console.log(req.session.captcha,'req.session.captcha')
	// req.query 获取get，
	// req.body 获取post
	console.log(req.body,'body')
	
	var user=req.body
	// 该参数是获取图形验证码的session
	if(req.session.captcha!=req.body.yzm){
		return res.json({
			code:400,
			msg:messageAjax.USER_MSG.E_YZM,
			// msg:'11',
		});
	}
	
	 
	
	//console.log(res.query,'body111')
	// 占位符号按顺序放入，代表相应的字段
	// let sql= "SELECT * FROM user WHERE name=?"
	
		mysqlSetting.connection.query(mysqlAll.USER_ALL.USER_LOGIN,[user.name],function(err,result){
			console.log(result,'result')
			if(err){
				return res.json({
					code:200,
					data:data,
					msg:'网络错误',
				});
			}
			if(result.length>0){
				if(result[0].pwd==user.pwd){
					let data={
						id:result[0].id,
						name:result[0].name,
						phone:result[0].phone,
						email:result[0].email
						
					}
					res.json({
						code:200,
						data:data,
						msg:'登录成功',
					});
				}else{
					res.json({
						code:200,
						msg:messageAjax.USER_MSG.LOGIN,
					});
				}
				
			}else{
				res.json({
					code:400,
					msg:messageAjax.USER_MSG.LOGIN,
				});
			}
			
		});
	
	//请勿开启，开启后接口调用第二次调用会出现错误
	// connection.end();
	
	exports.getReqesAll=function(req,res,next){
		
		res.json({
			code:200,
			msg:res,
		});
		 
		
		//请勿开启，开启后接口调用第二次调用会出现错误
		// connection.end();
		
		
	}
	
}

