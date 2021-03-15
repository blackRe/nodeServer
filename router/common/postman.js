// const express = require('express')
// let app = express()
// var mysql=require('mysql')
var request = require('request');
var mysqlAll=require('../common/mysqlAll.js')//sql语法汇总
var mysqlSetting=require('../common/setting.js')
var messageAjax=require('../common/messageAjax.js')//提示语
var commonMothos=require('../common/commonMothos.js')//公共方法，包含政策，以及各类全局js

	
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
	   var getData={}
	   for (let i = 0; i < bodyData.addData.length; i++) {
		  if(bodyData.addData[i].actVal=='true'){
			  console.log(getData[bodyData.addData[i].KEY],'pppp')
			  // getData[bodyData.addData[i].KEY] = getData[bodyData.addData[i].VALUE
		  }
			
	   }
	  // console.log(getData'getData')
	   if(bodyData.ajaxType=='POST'){
			console.log(bodyData.httpUrl,'bodyData.dataAjaxPOST')
			request({
			    timeout:5000,    // 设置超时
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
			let dataJoin=''
			console.log(bodyData.httpUrl,'bodyData.dataAjax')
			// for(let i=0;i<bodyData.dataAjax.length;i++ ){
			// 	let str=bodyData.dataAjax[i].key+'='+bodyData.dataAjax[i].value
			// 	console.log(str,'strstrstrstr')
			// 	// dataJoin+=
			// }
			
			request({
			    timeout:5000,    // 设置超时
			    method:'GET',    //请求方式
			    url:bodyData.httpUrl, //url
			    qs:bodyData.dataAjax,
			    headers:bodyData.headerData
			},function (error, response, body) {
				// console.log(response,'response')
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
			
			
			
			
			
			
			
			// request('http://adg.yinkeb.com/Service/Login/loginByPassword', function (error, response, body) {
			//   if (!error && response.statusCode == 200) {
			 
			// 		res.json({
			// 			code:200,
			// 			msg:JSON.parse(body) ,
			// 		});
			//   }else{
			// 	  res.json({
			// 	  	code:400,
			// 	  	msg:'数据不存在，请核对相关信息是否正确',
			// 	  });
			//   }
			// })
		}
	  
	
}

