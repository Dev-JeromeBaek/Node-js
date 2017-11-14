var express = require('express');
var bodyParser = require('body-parser');
// 'body-parser' 모듈을 사용하기 위한 설정.

var fs = require('fs');
// 파일시스템을 제어 모듈을 사용하기 위한 설정.
var OrientDB = require('orientjs');
// Orinetjs 모듈을 사용하기위한 require();

var server = OrientDB({
	host: 'localhost',
	port: 2424,
	username: 'root',
	password: '0123'
});
// Jerome_Core
var db = server.use('orient_test1');
// Jerome
// var db = server.use('orinet_test_Jerome');

var app = express();
app.locals.pretty = true;
// 템플릿의 줄바꿈 현상 설정.

/*
var urlencodedParser = bodyParser.urlencoded({ extended: false});
// body-parser 사용 설정.

app.use(urlencodedParser);
// body-parser 사용.
*/

app.use(bodyParser.urlencoded({ extended: false}));
// body-parser 사용 설정 및 사용.

app.set('views', './views_orientDB');
// 템플릿 엔진의 파일들은 views_file폴더에 있다고 설정.

app.set('view engine', 'jade');
// 어떤 템플릿 엔진 설정할지 설정.

app.get('/topic/add', function(req, res) {
	// res.send('Route Test');
	var sql = 'SELECT FROM topic';
	db.query(sql).then(function(topics) {
		if(topics.length === 0) {
			console.log('There is no topic record.');
			res.status(500).send('Internal Server Error');
		}
		res.render('add', {topics:topics});
	});
});
app.post('/topic/add', function(req, res) {
	// res.send('Router POST test');

	var title = req.body.title;
	var description = req.body.description;
	var author = req.body.author;
	var sql = 'INSERT INTO topic (title, description, author) VALUES(:title, :desc, :author)';
	db.query(sql, {
		params:{
			title:title,
			desc:description,
			author:author
		}
	}).then(function(results) {
		res.send(results);
		// res.send(results[0]['@rid']);
		// res.redirect('/topic/'+encodeURIComponent(results[0]['@rid']));
	});
});

app.get('/topic/:id/edit', function(req, res) {
	// res.send('Route Test');
	var sql = 'SELECT FROM topic';
	var id = req.params.id;
	db.query(sql).then(function(topics) {
		var sql = 'SELECT FROM topic WHERE @rid=:rid';
		db.query(sql, {params:{rid:id}}).then(function(topic) {
			res.render('edit', {topics:topics, topic:topic[0]});
		});
	});
});

app.post('/topic/:id/edit', function(req, res) {
	// res.send('Route Test');
	var sql = 'UPDATE topic SET title=:t, description=:d, author=:a WHERE @rid=:rid';
	var id = req.params.id;
	var title = req.body.title;
	var desc = req.body.description;
	var author = req.body.author;
	// res.send(id+''+title+''+desc+''+author+''+['@rid']);
	db.query(sql, {
		params:{
			t:title,
			d:desc,
			a:author,
			rid:id
		}
	}).then(function(results) {
		// res.send(results[0]);
		res.redirect('/topic/'+encodeURIComponent(id));
	});
});

app.get('/topic/:id/delete', function(req, res) {
	// res.send('Route Test');
	var sql = 'SELECT FROM topic';
	var id = req.params.id;
	db.query(sql).then(function(topics) {
		var sql = 'SELECT FROM topic WHERE @rid=:rid';
		db.query(sql, {params:{rid:id}}).then(function(topic) {
			res.render('delete', {topics:topics, topic:topic[0]});
		});
	});
});

app.post('/topic/:id/delete', function(req, res) {
	// res.send('Route Test');
	var sql = 'DELETE FROM topic WHERE @rid=:rid';
	var id = req.params.id;
	// res.send(id+''+title+''+desc+''+author+''+['@rid']);
	db.query(sql, {params:{rid:id}}).then(function(results) {
		// res.send(results[0]);
		res.redirect('/topic/');
	});
});

app.get(['/topic','/topic/:id'], function(req, res) {
	var sql = 'SELECT FROM topic';
	db.query(sql).then(function(topics) {
		var id = req.params.id;
		if(id) {
			var sql = 'SELECT FROM topic WHERE @rid=:rid';
			db.query(sql, {params:{rid:id}}).then(function(topic) {
				console.log(topic[0]);
				res.render('view', {topics:topics, topic:topic[0]});
			});
		} else {
			res.render('view', {topics:topics});
		}
		
	});
	/*
	fs.readdir('data_file', function(err, files) {
		if(err) {
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		var id = req.params.id;
		if(id) {
			// id값이 있을 때
			fs.readFile('data_file/'+id, 'utf-8', function(err, data) {
				// 'data_file'디렉터리 안에 파일을 경로로 잡아줌.
				// 'utf-8' 해당 페이지의 인코딩 설정
				// callback함수 (에러, 전달받은 data)
				if(err) {
					console.log(err);
					res.status(500).send('Internal Server Error');
				}
				res.render('view', {topics:files, title:id, description:data});
			});
		} else {
			// id값이 없을 때
			res.render('view', {topics:files, title:'Welcome', description:'Hello, JavaScript for Server'});
			// 가져온 files라는 배열을 topics라는 변수로 사용한다.
		}
	});
	// 'data_file'디렉터리 안의 파일들을 가져오는 작업.
	// 가져온 파일들의 목록은 'files'라는 배열로 저장이 됨.
	*/
});
// app.get('/topic/:id', function(req, res) {
// 	var id = req.params.id;
// 	fs.readdir('data_file', function(err, files) {
// 		if(err) {
// 			console.log(err);
// 			res.status(500).send('Internal Server Error');
// 		}
// 		fs.readFile('data_file/'+id, 'utf-8', function(err, data) {
// 			// 'data_file'디렉터리 안에 파일을 경로로 잡아줌.
// 			// 'utf-8' 해당 페이지의 인코딩 설정
// 			// callback함수 (에러, 전달받은 data)
// 			if(err) {
// 				console.log(err);
// 				res.status(500).send('Internal Server Error');
// 			}
// 			res.render('view', {topics:files, title:id, description:data});
// 		});
// 	});
// });


app.listen(3330, function() {
	console.log('Connected, 3330 port! - app_orientDB.js');
});
