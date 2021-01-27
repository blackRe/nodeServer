// const express = require('express')
// let app = express()
// var mysql=require('mysql')
var mysqlSetting=require('../common/setting.js')
var svgCaptcha = require('svg-captcha');


exports.svg=function(req,res){ 
    var codeConfig = {
        size: 4,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 1, // 干扰线条的数量
        height: 35,
        inverse: false,
        fontSize: 40,
    }
    var captcha = svgCaptcha.create(codeConfig);
    req.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
    console.log(req.session.captcha);
 
    res.status(200).json({
        code: 200,
        message: 'OK',
        img: captcha.data
    })
 
}