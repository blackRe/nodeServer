var http = require('http');
var express = require('express')
var app = express();
const httpServer=http.createServer(app)

var path = require("path")
var router = require("router");
var routerIndex = require("./router/index.js");

var uploadsFn = require("./router/upload/upload.js");
// // 图片上传
const multer = require('multer')
const upload = multer({
  dest:"./router/upload/uploads",//上传文件存放路径
  // dest:"./uploads/uedUploads",//上传文件存放路径,如需要修改路径，可配置不同的路径即可
 
});


app.post('/profile', upload.single('avatar'), function (req, res, next) {
	// console.log(req,'reqklp')
	uploadsFn.add(req,res,next)	
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
	console.log(req)
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
})











// 对请求的url的请求方式进行判断,对所有接口进行监控
app.use(function(req,res,next){
	let url=req.url;
	
	if(req.method=='GET'){
		console.log(url,req.method,'GET请求')
		next()
	}else if(req.method=='POST'){
		console.log(url,req.method,'POST请求')
		next()
	}else{
		res.json({code:'404',message:'请求方式错误或者不限制请求方式'});
		res.end()
	}

	
})
// 路由
app.use('/',routerIndex)
// app.use('/upload',require("./routes/upload/upload"));
app.use(express.static("./router/upload"));//将静态资源托管，这样才能在浏览器上直接访问预览图片或则html页面

httpServer.listen(7000,function(){
	console.log('接口已启动')
});








// 终端打印如下信息
// console.log('Server running at http://127.0.0.1:8000');



