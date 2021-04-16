const express = require('express')
let app = express()
var mysql=require('mysql')


if(process.env.NODE_ENV=='dev'){
	// var setting=require('../../common/setting.js')
	exports.connection = mysql.createConnection({
	
		host: "localhost",
		port: '3306',
		user: "root",
		password:"kLP551319zxc",
		ssl  : {
		    // DO NOT DO THIS
		    // set up your ca correctly to trust the connection
		    rejectUnauthorized: false,
			
		  },
		 serverTimezone:'UTC',
		 database: "admin",//表明
		 connectionLimit : 10,
		 long_password:'on',
		
		
		debug:['ComQueryPacket'],//日志打印
	
	})
	
	//single是单图片上传，多图片上传 array ,single里面就是上传图片的key值 
	//和图片相关的是req.file 
	
}else if(process.env.NODE_ENV=='prd'){
	exports.connection = mysql.createConnection({
		host: "8.141.66.163",//公网
		port: '3306',
		user: "root",
		password:"kLP!@#666",
		ssl  : {
		    // DO NOT DO THIS
		    // set up your ca correctly to trust the connection
		    rejectUnauthorized: false,
			
		  },
		 serverTimezone:'UTC',
		 database: "admin",//表明
		 connectionLimit : 10,
		 long_password:'on',
		
		
		debug:['ComQueryPacket'],//日志打印
	
	})
	
}else{
	// var setting=require('../../common/setting.js')
	exports.connection = mysql.createConnection({
	
		host: "localhost",
		port: '3306',
		user: "root",
		password:"kLP551319zxc",
		ssl  : {
		    // DO NOT DO THIS
		    // set up your ca correctly to trust the connection
		    rejectUnauthorized: false,
			
		  },
		 serverTimezone:'UTC',
		 database: "admin",//表明
		 connectionLimit : 10,
		 long_password:'on',
		
		
		debug:['ComQueryPacket'],//日志打印
	
	})
	
	//single是单图片上传，多图片上传 array ,single里面就是上传图片的key值 
	//和图片相关的是req.file 
}





