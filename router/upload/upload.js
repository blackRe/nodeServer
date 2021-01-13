const express = require('express')
let app = express()
const multer = require('multer')
const fs = require('fs')
const path = require('path')
//single是单图片上传，多图片上传 array ,single里面就是上传图片的key值 
//和图片相关的是req.file 
exports.add=function(req,res,next){
	//console.log(req,'调用图片上传接口');
	//console.log(req.file,'originalname:')
	
	
	
	
	// 获取后缀
	let fileName=req.file.originalname
	var first = fileName.lastIndexOf(".");//取到文件名开始到最后一个点的长度
	var namelength = fileName.length;//取到文件名长度
	var filesuffix = fileName.substring(first + 1, namelength );//截取获得后缀名
	
	
	// let oldPath= ('/Users/konglingpo/Desktop/nodeServer/uploads/uedUploads/'+req.file.filename)
	// let newPath=('/Users/konglingpo/Desktop/nodeServer/uploads/uedUploads/'+req.file.filename+'API'+'.'+filesuffix)  
	
	// 根据存储的路径不同，写对应的路径如上
	let dataTime=new Date().getTime()
	let oldPath= (__dirname+'/uploads/'+req.file.filename);
	let newPath=(__dirname+'/uploads/'+req.file.filename+dataTime+'.'+filesuffix);

	
	//修改文件名称
	fs.rename(oldPath, newPath, function (err) {
	    if (err){
			//console.log('error')
			res.json({code:400,msg:'上传失败'});
		} else{
			//console.log(new Date().getTime())
			
			let paths= 'http://127.0.0.1:7000/uploads/'+req.file.filename+dataTime+'.'+filesuffix
			//console.log('修改后的文件名：', paths);
			res.json({code:200,
			fileUrl:paths,
			fileName:fileName,
			msg:'上传成功'});
		}
	 
	});
		
	// file:///Users/konglingpo/Desktop/nodeServer/uploads/uedUploads/40062c789455f68fc912b01ea63ae0daAPI.png
	//console.log(filesuffix,'filesuffix')
	
}

