// const express = require('express')
// let app = express()
// var mysql=require('mysql')
var request = require('request');
var mysqlAll=require('../common/mysqlAll.js')//sql语法汇总
var mysqlSetting=require('../common/setting.js')
var messageAjax=require('../common/messageAjax.js')//提示语
var commonMothos=require('../common/commonMothos.js')//公共方法，包含政策，以及各类全局js
const interfaces = require('os').networkInterfaces();//获取当前的网络ip
	const fs = require('fs')
	const path = require('path')
	var request = require('request');
	
	exports.postSave = function(req, res, next) {
		// exports.reqAll={
		// 	ajaxTypePost:ajaxTypePost,
		// 	reqDataPost:reqDataPost
		// };
		let boundaryKey = '----' + new Date().getTime(); // 用于标识请求数据段
		
		console.log(global.reqAll,'exports.reqAll')
				request({
					timeout: 500000000, // 设置超时
					//method: 'POST', //请求方式
					method: global.reqAll.ajaxTypePost, //请求方式
					url: 'http://adg.yinkeb.com/Service/Upload/uploadImage', //url
					formData: global.reqAll.reqDataPost,
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
					//console.log(data,'data')
						// res.json({
							
						// 	data: data,
						// });
					if (!error && response.statusCode == 200) {
						// console.log(body);
						res.json({
							code: 200,
							data: data,
						});
						fs.unlink(srcFile, function(err) {
							if (err) {
								throw err;
							}
							console.log('文件:' + srcFile + '删除成功！'+data);
						})
					} else {
						res.json({
							code: 400,
							data: error,
						});
						fs.unlink(srcFile, function(err) {
							if (err) {
								throw err;
							}
							console.log('文件:' + srcFile + '删除成功！');
						})
					}
					
	
				});
	
		
	}
	
	
	exports.postManAjax=function(req,res,next){
		// 使用request服务请求到相关接口传递的数据,并将数据返回来
		// console.log(req.body,'klp')
		// 目前请求暂时只支持post和get,请不要使用其他请求
		
		/*dataAjax:所有的请求参数
		contentType：请求头的方式
		httpUrl: 'http://127.0.0.1:7000/profile',//需要调用的接口
		ajaxType: 'POST',//调用过来接口的请求方式
		radioBody: 'Params',请求方式
		fileType: 'file',//文件格式
		contentType: 'form-data',//请求头的格式
		addData: [{
			valueType: 'file', //判断显示输入框还是其他类型
			params: [], //处理好的图片或者文件类型
			filesName: [], //上传文件的名字
			actVal: true, //该行是否被选中，默认为true，选中的参数将会被传递
			KEY: 'avatar', //输入框的key
			VALUE: '', //输入的内容
			ESCRIPTION: '' //输入的描述
		}]
		*/
	  
	   var bodyData=req.body
	   // console.log(req,getLocalIP,'reqreqreqreq')
	   // 判断当前的ip
	   // 字符串匹配当前的ip是否包含127.0.0.1
	   // if(bodyData.httpUrl.indexOf('127.0.0.1')>=0||bodyData.httpUrl.indexOf('localhost')>=0){
		  //  bodyData.httpUrl=getLocalIP()//获取当前的if
	   // }
	   let ipLoc=getLocalIP()
	   if(bodyData.httpUrl.indexOf('127.0.0.1')>=0){
	   		bodyData.httpUrl=bodyData.httpUrl.replace('127.0.0.1', ipLoc)
	   				
	   }else if(bodyData.httpUrl.indexOf('localhost')>=0){
	   		bodyData.httpUrl=bodyData.httpUrl.replace('localhost',ipLoc)
	   				 
	   }
	   
	   if(bodyData.ajaxType=='POST'){
		   
			request({
			    timeout:50000,    // 设置超时
			    method:'POST',    //请求方式
			    url:bodyData.httpUrl, //url
			    form:bodyData.dataAjax,
				headers:bodyData.headerData
			     
			},function (error, response, body) {
				
				var data;
				if(commonMothos.isJSON(body)){
					data=JSON.parse(body)
				}else{
					data=body
				}
			    if (!error && response.statusCode == 200) {
			        // console.log(body);
								res.json({
									code:200,
									data:data ,
								});
			    }else{
						  res.json({
						  	code:400,
						  	data:error,
						  });
			        // console.log("error");
			    }
			});
			
			
		}else{
			console.log(bodyData.dataAjax,bodyData.httpUrl,'bodyData.dataAjax')
			request({
			    timeout:50000,    // 设置超时
			    method:'GET',    //请求方式
			    url:bodyData.httpUrl, //url
			    qs:bodyData.dataAjax,
			    headers:bodyData.headerData
			},function (error, response, body) {
				console.log(body,'response')
				// console.log(error,'error')
				//commonMothos.isJSON(body);;判断是否为json
				var data;
				if(commonMothos.isJSON(body)){
					data=JSON.parse(body)
				}else{
					data=body
				}
				
			    if (!error && response.statusCode == 200) {
								res.json({
									code:200,
									data:data,
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
	  
	
}

function getLocalIP(){
	let IPAdress = '';

	for(var devName in interfaces){
	  var iface = interfaces[devName];

	  if(devName=='en0'){
	  for(var i=0;i<iface.length;i++){
	        var alias = iface[i];

	        if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
	              IPAdress = alias.address;

	        }

	  }

	  }

	}

	return IPAdress;
};
