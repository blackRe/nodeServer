// const express = require('express')
// let app = express()
// var mysql=require('mysql')
var mysqlSetting=require('../common/setting.js')
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
	console.log('ppp')
	let sql="SELECT * FROM user WHERE name='klp'"
	
		mysqlSetting.connection.query(sql,[],function(err,result){
			// console.log(result[0],'result')
			if(result){
				res.json({
					code:200,
					data:result[0],
					msg:'数据成功',
				});
			}else{
				res.json({
					code:400,
					msg:err,
				});
			}
			
		});
	
	//请勿开启，开启后接口调用第二次调用会出现错误
	// connection.end();
	
	
}

