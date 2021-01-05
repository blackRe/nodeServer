var mysql = require('mysql')
// var connection = mysql.createConnection({

// host: "localhost";

// user: "root";

// password:"你的数据库密码";

// database: "你数据库的名字";

// })
var connection = mysql.createConnection({

	host: "localhost",

	user: "root",

	password: "kLP551319zxc",

	database: "admin",

})
connection.connect();

var sql = "SELECT 1 + 1 AS solution";
//["a,b,c",'api','api.id = "123" and api.name = "qwe1" ']
function select(param) {
	sql1 = "select ? from ? where ?"
	connection.query(sql, param, function(err, result) {
		console.log(result, 'result')
	});
}


// add =function(){
// 	connection.query(sql,[],function(err,result){
// 		console.log(result,'result')
// 	});

// }

connection.end();
