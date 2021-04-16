const express = require('express')
let app = express()
const multer = require('multer')
const fs = require('fs')
const path = require('path')
var request = require('request');
var commonMothos = require('../common/commonMothos.js') //公共方法，包含政策，以及各类全局js

//single是单图片上传，多图片上传 array ,single里面就是上传图片的key值 
//和图片相关的是req.file 
exports.add = function(req, res, next) {
	//console.log(req,'调用图片上传接口');
	//console.log(req.file,'originalname:')
	console.log(req, 'reqlp')
	// 获取后缀
	let fileName = req.file.originalname
	var first = fileName.lastIndexOf("."); //取到文件名开始到最后一个点的长度
	var namelength = fileName.length; //取到文件名长度
	var filesuffix = fileName.substring(first + 1, namelength); //截取获得后缀名


	// let oldPath= ('/Users/konglingpo/Desktop/nodeServer/uploads/uedUploads/'+req.file.filename)
	// let newPath=('/Users/konglingpo/Desktop/nodeServer/uploads/uedUploads/'+req.file.filename+'API'+'.'+filesuffix)  

	// 根据存储的路径不同，写对应的路径如上
	let dataTime = new Date().getTime()
	let oldPath = (__dirname + '/uploads/' + req.file.filename);
	let newPath = (__dirname + '/uploads/' + req.file.filename + dataTime + '.' + filesuffix);


	//修改文件名称
	fs.rename(oldPath, newPath, function(err) {
		if (err) {
			//console.log('error')
			res.json({
				code: 400,
				msg: '上传失败'
			});
		} else {
			//console.log(new Date().getTime())

			let paths = 'http://127.0.0.1:7000/uploads/' + req.file.filename + dataTime + '.' + filesuffix
			//console.log('修改后的文件名：', paths);
			res.json({
				code: 200,
				fileUrl: paths,
				fileName: fileName,
				msg: '上传成功'
			});
		}

	});

	// file:///Users/konglingpo/Desktop/nodeServer/uploads/uedUploads/40062c789455f68fc912b01ea63ae0daAPI.png
	//console.log(filesuffix,'filesuffix')

}


exports.addList = function(req, res, next) {
	//console.log(req,'调用图片上传接口');
	//console.log(req.file,'originalname:')

	// 获取后缀
	let fileName = req.file.originalname
	var first = fileName.lastIndexOf("."); //取到文件名开始到最后一个点的长度
	var namelength = fileName.length; //取到文件名长度
	var filesuffix = fileName.substring(first + 1, namelength); //截取获得后缀名


	// let oldPath= ('/Users/konglingpo/Desktop/nodeServer/uploads/uedUploads/'+req.file.filename)
	// let newPath=('/Users/konglingpo/Desktop/nodeServer/uploads/uedUploads/'+req.file.filename+'API'+'.'+filesuffix)  

	// 根据存储的路径不同，写对应的路径如上
	let dataTime = new Date().getTime()
	let oldPath = (__dirname + '/uploads/' + req.file.filename);
	let newPath = (__dirname + '/uploads/' + req.file.filename + dataTime + '.' + filesuffix);


	//修改文件名称
	fs.rename(oldPath, newPath, function(err) {
		if (err) {
			//console.log('error')
			res.json({
				code: 400,
				msg: '上传失败'
			});
		} else {
			//console.log(new Date().getTime())

			let paths = 'http://127.0.0.1:7000/uploads/' + req.file.filename + dataTime + '.' + filesuffix
			//console.log('修改后的文件名：', paths);
			res.json({
				code: 200,
				fileUrl: paths,
				fileName: fileName,
				msg: '上传成功'
			});
		}

	});

	// file:///Users/konglingpo/Desktop/nodeServer/uploads/uedUploads/40062c789455f68fc912b01ea63ae0daAPI.png
	//console.log(filesuffix,'filesuffix')

}




exports.postManRequest = function(req, res, next) {
	const FormData = require('form-data');
	let f = fs.readFileSync("./router/upload/uploads/" + req.file.filename)
	let boundaryKey = '----' + new Date().getTime(); // 用于标识请求数据段


	let fileName = req.file.originalname
	var first = fileName.lastIndexOf("."); //取到文件名开始到最后一个点的长度
	var namelength = fileName.length; //取到文件名长度
	var filesuffix = fileName.substring(first + 1, namelength); //截取获得后缀名


	// let oldPath= ('/Users/konglingpo/Desktop/nodeServer/uploads/uedUploads/'+req.file.filename)
	// let newPath=('/Users/konglingpo/Desktop/nodeServer/uploads/uedUploads/'+req.file.filename+'API'+'.'+filesuffix)  

	// 根据存储的路径不同，写对应的路径如上
	let dataTime = new Date().getTime()
	let oldPath = (__dirname + '/uploads/' + req.file.filename);
	let newPath = (__dirname + '/uploads/' + req.file.filename + '.' + filesuffix);


	//修改文件名称
	fs.rename(oldPath, newPath, function(err) {
		if (err) {
			//console.log('error')
			res.json({
				code: 400,
				msg: '上传失败'
			});
		} else {

			var srcFile = "./router/upload/uploads/" + req.file.filename + '.' + filesuffix
			reqData = {
				//模拟fromData参数 :fs.createReadStream为当前文件路径
				file: fs.createReadStream(srcFile),
				mid: '18084',
				sign: 'fef26b54200a2b2e25dc9d3ee13a2e67',
				time: '1615296749',
			}
			request({
				timeout: 500000000, // 设置超时
				method: 'POST', //请求方式
				url: 'http://adg.yinkeb.com/Service/Upload/uploadImage', //url
				formData: reqData,
				headers: {
					"Content-Type": "multipart/form-data; boundary=" + boundaryKey,
					'Connection': 'keep-alive'
				},

			}, function(error, response, body) {



				var data;
				if (commonMothos.isJSON(body)) {
					data = JSON.parse(body)
				} else {
					data = body
				}

				if (!error && response.statusCode == 200) {
					// console.log(body);
					res.json({
						code: 200,
						data: data,
					});
				} else {
					res.json({
						code: 400,
						data: error,
					});
				}
				fs.unlink(srcFile, function(err) {
					if (err) {
						throw err;
					}
					console.log('文件:' + srcFile + '删除成功！');
				})

			});

		}

	});


	// reqData={
	// 	//模拟fromData参数 :fs.createReadStream为当前文件路径
	// 	file:fs.createReadStream(("./router/upload/uploads/"+req.file.filename)),
	// 	mid: '18084',
	// 	sign:'fef26b54200a2b2e25dc9d3ee13a2e67',
	// 	time:'1615296749',
	// 	// fromData:form
	// }
	// request({
	//     timeout:500000000,    // 设置超时
	//     method:'POST',    //请求方式
	//     url:'http://adg.yinkeb.com/Service/Upload/uploadImage', //url
	//     formData:reqData,
	// 	headers:{
	// 		"Content-Type":"multipart/form-data; boundary=" + boundaryKey,
	// 		'Connection': 'keep-alive'
	// 	},

	// },function (error, response, body) {
	// 	var data;
	// 	if(commonMothos.isJSON(body)){
	// 		data=JSON.parse(body)
	// 	}else{
	// 		data=body
	// 	}

	//     if (!error && response.statusCode == 200) {
	//         // console.log(body);
	// 					res.json({
	// 						code:200,
	// 						data:data ,
	// 					});
	//     }else{
	// 			  res.json({
	// 			  	code:400,
	// 			  	data:error,
	// 			  });
	//         // console.log("error");
	//     }
	// });



	/*	const express = require('express');
		const app = express();
		//bodyParser不支持form-data
		const multipart = require('connect-multiparty');
		const multipartyMiddleware = multipart();
		const  FormData = require('form-data');
		const Fs = require('fs');
		const fetch = require('node-fetch');
			
			console.log(req.body,'reqbody')
		const ajaxHeaders = req.headers;
			const fields=req.body;
			const files=req.files;
			let form = new FormData();
		    if (fields) {
		      for (let i in fields) {
		         if (fields.hasOwnProperty(i)) {
		          form.append(i, fields[i]);
		        }
		      }
		    }
		    if (files) {
		        const item = files.file;
		        form.append(item['fieldName'], Fs.createReadStream(item['path']));
			}
			//如果要指定请求头，要获取form对象的请求头，其他信息可以自定义
			let fileHeaders=form.getHeaders();
			fileHeaders['ticket']=ajaxHeaders ['ticket'];
			const address='http://test';
			fetch(address, { 
				method: 'POST', 
				body: form,
				headers: fileHeaders
			})
		    .then(response => response.json())
			.then(json => res.json(json));
		*/
}

/*
exports.postManRequest=function(req,res,next){
	console.log(req,'调用图片上传接口');
	// console.log(req,'originalname:')
	// req.file.fieldname='file'
	
	let reqData;
	// reqData.file=req.file
	console.log(req.file,'pppp')
	let f = fs.readFileSync("./router/upload/uploads/"+req.file.filename)
	// let f=req.file.buffer;
	// console.log(f,'fff')
	
	reqData={
		//file:f,
		mid: '18084',
		sign:'fef26b54200a2b2e25dc9d3ee13a2e67',
		time:'1615296749',
		fromData:params
	}
	let boundaryKey = '----' + new Date().getTime();    // 用于标识请求数据段
	request({
	    timeout:500000,    // 设置超时
	    method:'POST',    //请求方式
	    url:'http://adg.yinkeb.com/Service/Upload/uploadImage', //url
	    form:reqData,
		headers:{
			"Content-Type":"multipart/form-data; boundary=" + boundaryKey,
			'Connection': 'keep-alive'
		}
	     
	},function (error, response, body) {
		
		
	    if (!error && response.statusCode == 200) {
	        // console.log(body);
						res.json({
							code:200,
							data:'ok' ,
						});
	    }else{
				  res.json({
				  	code:400,
				  	data:error,
				  });
	        // console.log("error");
	    }
	});
	
		
	
}
*/
