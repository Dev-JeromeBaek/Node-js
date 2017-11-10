var OrientDB = require('orientjs');

var server = OrientDB({
	host: 'localhost',
	port: 2424,
	username: 'root',
	password: '0123'
});

var db = server.use('orient_test1');

var sql = "INSERT INTO topic (title, description) VALUES(:title, :desc)";
// var param = {
// 	params:{
// 		title:'Express',
// 		desc:'Express is framework for web'
// 	}
// }
db.query(sql, {
	params:{
		title:'Express',
		desc:'Express is framework for web'
	}
}).then(function(results) {
	console.log(results);
});

/*
db.record.get('#19:0').then(function (record) {
	console.log('Loaded record:', record.title);
});
*/

/*
* CREATE
* READ
* UPDATE
* DELETE
*
* CRUD
*/

// CREATE
/*
var sql = 'SELECT FROM topic';
db.query(sql).then(function(results) {
	console.log(results);
});
*/
/*
var sql = 'SELECT FROM topic WHERE @rid=:rid';
var param = {
	params: {
		rid:'#19:0'
	}
};
db.query(sql, param).then(function(results) {
	console.log(results);
});
*/


