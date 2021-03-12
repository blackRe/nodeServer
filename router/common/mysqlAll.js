// 用户提示
exports.USER_ALL={
	//查询用户接口
	USER_LOGIN:"SELECT * FROM user WHERE phone=?",
	//查询所有用户
	USER_LIST:"SELECT id,name,create_time,email,imageUrl,phone,updata_time FROM user WHERE id>=?",
	//注册用户接口
	USER_SET:"INSERT INTO user (name,pwd,email,phone,imageUrl,create_time,updata_time) VALUES (?,?,?,?,?,?,?)",
	// 查询用户名邮箱，电话是否重复
	USER_SELECT:'SELECT * FROM user WHERE name=? OR phone=? OR email=?'
	
}

