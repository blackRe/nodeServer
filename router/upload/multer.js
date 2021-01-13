const express = require('express')
let app = express()
const multer = require('multer')
const fs = require('fs')
const path = require('path')
//single是单图片上传，多图片上传 array ,single里面就是上传图片的key值 
//和图片相关的是req.file 


const router = require("express").Router();
const upload = multer({
  // dest:"../../uploads/uedUploads"//上传文件存放路径
  dest:"./uploads"//上传文件存放路径
});

const singleMidle = upload.single("singleFile");//一次处理一张
const arrMidle  = upload.array("arrayFile", 5);//一次最多处理5张
const fieldsMidle  = upload.fields([
  {name:"fieldSingleFile", maxCount:1},
  {name:"fieldArrayFile", maxCount:4}
]);//可同时处理多个上传控件的上传
//实际项目中根据自己的情况，使用以上三种用法之一即可！




app.post('/profile', upload.single('avatar'), function (req, res, next) {
	//console.log(req,'文件')
	
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
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




module.exports = router;