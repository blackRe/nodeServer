(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bdd85bac"],{"6f75":function(e,r,t){"use strict";t("829c")},"829c":function(e,r,t){},"8f07":function(e,r,t){"use strict";t.r(r);var a=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"setUser"},[t("el-row",{staticStyle:{"margin-bottom":"20px"},attrs:{gutter:20}},[t("el-col",{attrs:{span:12,offset:6}},[t("div",{staticClass:"grid-content bg-purple"},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"用户名",prop:"Login"}},[t("el-input",{attrs:{placeholder:"请输入用户名"},model:{value:e.ruleForm.Login,callback:function(r){e.$set(e.ruleForm,"Login",r)},expression:"ruleForm.Login"}})],1),t("el-form-item",{attrs:{label:"手机号",prop:"phone"}},[t("el-input",{attrs:{placeholder:"请输入手机号"},model:{value:e.ruleForm.phone,callback:function(r){e.$set(e.ruleForm,"phone",r)},expression:"ruleForm.phone"}})],1),t("el-form-item",{attrs:{label:"邮箱",prop:"email"}},[t("el-input",{attrs:{placeholder:"请输入邮箱"},model:{value:e.ruleForm.email,callback:function(r){e.$set(e.ruleForm,"email",r)},expression:"ruleForm.email"}})],1),t("el-form-item",{attrs:{label:"密码",prop:"pwd"}},[t("el-input",{attrs:{placeholder:"请输入密码"},model:{value:e.ruleForm.pwd,callback:function(r){e.$set(e.ruleForm,"pwd",r)},expression:"ruleForm.pwd"}})],1),t("el-form-item",{attrs:{label:"确认密码",prop:"pwd1"}},[t("el-input",{attrs:{placeholder:"请再次输入密码"},model:{value:e.ruleForm.pwd1,callback:function(r){e.$set(e.ruleForm,"pwd1",r)},expression:"ruleForm.pwd1"}})],1),t("el-form-item",{attrs:{label:"上传头像"}},[t("el-upload",{staticClass:"avatar-uploader",attrs:{name:"avatar",action:e.$ajaxUrl.profile1,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.imageUrl?t("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t("el-form-item",{staticClass:"vInput",attrs:{label:"验证码",prop:"yzm"}},[t("el-input",{attrs:{placeholder:"请输入验证码"},model:{value:e.ruleForm.yzm,callback:function(r){e.$set(e.ruleForm,"yzm",r)},expression:"ruleForm.yzm"}}),t("div",{staticClass:"vCode",domProps:{innerHTML:e._s(e.svgImg)},on:{click:function(r){return e.getSvg()}}}),e._v(" "+e._s(e.count)+","+e._s(e.$store.state.count)+","+e._s(e.ids)+" ")],1),t("el-form-item",[t("el-button",{staticStyle:{width:"290px"},attrs:{type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("登录")])],1)],1)],1)])],1)],1)},l=[],s=t("5530"),o=t("ade3"),i=t("d4ec"),n=t("bee2"),m=t("262e"),u=t("2caf"),c=t("9ab4"),g=t("4328"),p=t.n(g),d=t("1b40"),f=t("9140"),v=t("80c6"),b=t("2f62"),h=function(e){Object(m["a"])(t,e);var r=Object(u["a"])(t);function t(){var e;return Object(i["a"])(this,t),e=r.apply(this,arguments),e.svgImg="",e.imageUrl="",e}return Object(n["a"])(t,[{key:"data",value:function(){var e;return{ruleForm:{Login:"",pwd:"",yzm:"",pwd1:"",email:"",delivery:!1},rules:(e={Login:[{required:!0,message:"请输入正确的名称或手机号",trigger:"change"},{min:2,max:11,message:"请输入正确的名称或手机号",trigger:"change"}],pwd:[{required:!0,message:"请输入密码",trigger:"change"},{min:6,message:"密码长度在6个字符以上",trigger:"change"}],pwd1:[{required:!0,message:"请输入密码",trigger:"change"},{min:6,message:"密码长度在6个字符以上",trigger:"change"}]},Object(o["a"])(e,"pwd1",[{required:!0,message:"请输入密码",trigger:"change"},{min:6,message:"密码长度在6个字符以上",trigger:"blur"}]),Object(o["a"])(e,"email",[{required:!0,message:"请输入邮箱",trigger:"blur"},{min:1,message:"邮箱格式不正确",trigger:"blur"}]),Object(o["a"])(e,"yzm",[{required:!0,message:"请输入验证码",trigger:"blur"},{min:4,max:4,message:"验证码长度在4个字符",trigger:"blur"}]),e)}}},{key:"handleAvatarSuccess",value:function(e,r){console.log(r.raw,e,"file.raw"),200==e.code&&(this.imageUrl=e.fileUrl)}},{key:"beforeAvatarUpload",value:function(e){var r="image/jpeg"===e.type||"image/png"===e.type,t=e.size/1024/1024<8;return r||this.$message.error("上传头像图片只能是 JPG,PNG 格式!"),t||this.$message.error("上传头像图片大小不能超过 8MB!"),r&&t}},{key:"test",value:function(){console.log(this.count)}},{key:"getLogin",value:function(){var e=this,r={name:e.ruleForm.Login,pwd:e.ruleForm.pwd,phone:e.ruleForm.phone,email:e.ruleForm.email,imageUrl:e.imageUrl,yzm:e.ruleForm.yzm};e.$axios({url:e.$ajaxUrl.setUser,method:"post",data:p.a.stringify(r)}).then((function(r){console.log(r.data.code,"res");var t=r.data.code;200==t?(e.$store.commit("userSet",r.data.data),e.$message({message:"注册成功",type:"success"}),e.$router.push("/")):e.$message.error(r.data.msg),e.getSvg()}),(function(r){e.getSvg(),console.log(r)}))}},{key:"getSvg",value:function(){var e=this;e.$axios({url:e.$ajaxUrl.svg,method:"get"}).then((function(r){e.svgImg=r.data.img}),(function(e){console.log(e)}))}},{key:"submitForm",value:function(e){var r=this,t=this;if(this.$store.commit("increment",22),this.$store.dispatch("incrementIdStep"),t.ruleForm.pwd!=t.ruleForm.pwd1)return t.$message.error("两次输入的密码不一致"),!1;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;r.getLogin()}))}},{key:"resetForm",value:function(e){this.$refs[e].resetFields()}}]),t}(d["d"]);h=Object(c["a"])([Object(d["a"])({components:{leftView:f["a"],imgUp:v["a"]},created:function(){this.getSvg()},computed:Object(s["a"])({},Object(b["e"])(["count","ids"]))})],h);var F=h,w=F,y=(t("6f75"),t("2877")),$=Object(y["a"])(w,a,l,!1,null,"7602a6b2",null);r["default"]=$.exports}}]);