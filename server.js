var http = require('http');
var express = require('express')
var app = express();
//var winston = require('./router/common/logger.js') //log日志

//解决post请求参数无法获取
var bodyParser =require('body-parser')
// session模块
var session = require('express-session')
// session设置
let test1Name=new Date().getTime()
app.use(session({
	name: 'test1', // 非常重要，用于区分两个系统的session
	secret: 'test1'+test1Name,// 建议使用 128 个字符的随机字符串
	cookie: {
		maxAge: 3600 * 60 * 60 * 1000
	},//cookie生存周期，毫秒计算
	resave: true,//cookie之间的请求规则,假设每次登陆，就算会话存在也重新保存一次
	saveUninitialized: true//强制保存未初始化的会话到存储器
}));


// app.use(bodyPaeser.json({
//     // extended: false,                 //扩展模式
//     limit:    2*1024*1024           //限制-2M
//  }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const httpServer = http.createServer(app)

var path = require("path")
var router = require("router");
var routerIndex = require("./router/index.js");




var uploadsFn = require("./router/upload/upload.js");
// // 图片上传
const multer = require('multer')
const upload = multer({
	dest: "./router/upload/uploads", //上传文件存放路径
	// dest:"./uploads/uedUploads",//上传文件存放路径,如需要修改路径，可配置不同的路径即可

});


app.post('/profile', upload.single('file'), function(req, res, next) {
	// console.log(req,'reqklp')
	// uploadsFn.add(req, res, next)
	uploadsFn.postManRequest(req, res, next)
	// req.file is the `avatar` file
	// req.body will hold the text fields, if there were any
})
// app.post('/postManFileAjax', upload.single('avatarklp'), function(req, res, next) {
// 	// console.log(req,'reqklp')
// 	// postmanupload.postManRequest(req, res, next)
// 	// req.file is the `avatar` file
// 	// req.body will hold the text fields, if there were any
// })

app.post('/photos/upload', upload.array('photos', 12), function(req, res, next) {
	uploadsFn.addList(req, res, next)
	// console.log(req,'klp')
	// req.files is array of `photos` files
	// req.body will contain the text fields, if there were any
})

var cpUpload = upload.fields([{
	name: 'avatar',
	maxCount: 1
}, {
	name: 'avatarklp',
	maxCount: 1
},{
	name: 'gallery',
	maxCount: 8
}])
app.post('/cool-profile', cpUpload, function(req, res, next) {
	// req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
	//
	// e.g.
	//  req.files['avatar'][0] -> File
	//  req.files['gallery'] -> Array
	//
	// req.body will contain the text fields, if there were any
})











// 对请求的url的请求方式进行判断,对所有接口进行监控
app.use(function(req, res, next) {
	let url = req.url;

	if (req.method == 'GET') {
		//console.log(url, req.method, 'GET请求')
		next()
	} else if (req.method == 'POST') {
		//console.log(url, req.method, 'POST请求')
		next()
	} else {
		res.json({
			code: '404',
			message: '请求方式错误或者不限制请求方式'
		});
		res.end()
	}


})
// 路由
app.use('/', routerIndex)
// app.use('/upload',require("./routes/upload/upload"));
//将静态资源托管，这样才能在浏览器上直接访问预览图片或则html页面，所以需要访问的页面可以放在里面即可
app.use(express.static("./router/upload")); 


// app.all('*', function(req, res, next) {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header('Access-Control-Allow-Headers',
// 		'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
// 	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
// 	if (req.method == 'OPTIONS') {
// 		res.send(200);
// 	} else {
// 		next();
// 	}
// });



httpServer.listen(7000, function() {
	console.log('7000接口已启动，页面请访问http://127.0.0.1:7000/webDist1/index.html#/')
});

