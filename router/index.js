var express = require('express');
var router = express.Router();
	// 接口做对应的拦截配置路由
var allModules={
	upload:require('./upload/upload.js'),
	login:require('./login/login.js'),
	user:require('./user/user.js'),
	postMan:require('./common/postman.js'),//postman调用
	
	// multer:require('./upload/multer.js')
	svgCaptcha:require('./common/svgCaptcha.js'),
}

if(process.env.NODE_ENV=='dev'){
	//当vue页面完成后将页面丢进来，将他的路由替换即可 /apiProxy/api/
	router.all('/apiProxy/api/:module/:action',function(req,res,next){
		allModules[req.params.module][req.params.action](req,res,next)
	})
}else if(process.env.NODE_ENV=='prd'){
	//当vue页面完成后将页面丢进来，将他的路由替换即可 /apiProxy/api/
	router.all('/apiProxy/api/:module/:action',function(req,res,next){
		allModules[req.params.module][req.params.action](req,res,next)
	})
}else{
	//当vue页面完成后将页面丢进来，将他的路由替换即可 /apiProxy/api/
	router.all('/api/:module/:action',function(req,res,next){
		allModules[req.params.module][req.params.action](req,res,next)
	})
}
//当vue页面完成后将页面丢进来，将他的路由替换即可 /apiProxy/api/
// router.all('/api/:module/:action',function(req,res,next){
// 	allModules[req.params.module][req.params.action](req,res,next)
// })
module.exports=router