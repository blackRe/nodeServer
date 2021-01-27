var express = require('express');
var router = express.Router();
	// 接口做对应的拦截配置路由
var allModules={
	upload:require('./upload/upload.js'),
	login:require('./login/login.js'),
	user:require('./user/user.js'),
	// multer:require('./upload/multer.js')
	svgCaptcha:require('./common/svgCaptcha.js'),
}
router.all('/api/:module/:action',function(req,res,next){
	allModules[req.params.module][req.params.action](req,res,next)
})
module.exports=router