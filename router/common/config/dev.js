var config = {
    env: 'dev', //环境名称
    port: 3001, //服务端口号
    mysql_config: {
        //mysql数据库配置
        // host: 'localhost',
        // user: 'root',
        // port: '3306',
        // database: '',
        // password: '',
        // connectionLimit: 50 ,// 最大连接数
		host: "8.141.66.163",//公网
		port: '3306',
		user: "root",
		password:"kLP!@#666",
		ssl  : {
		    // DO NOT DO THIS
		    // set up your ca correctly to trust the connection
		    rejectUnauthorized: false,
			
		  },
		 serverTimezone:'UTC',
		 database: "admin",//表明
		 connectionLimit : 10,
		 long_password:'on',
		
		
		debug:['ComQueryPacket'],//日志打印
		
		
    },
    mongodb_config: {
        //mongodb数据库配置
    },
    redis_config: {
        //redis数据库配置
    },
};


module.exports = config;