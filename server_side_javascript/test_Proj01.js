var express = require('express');
var bodyParser = require('body-parser');
// 'body-parser' 모듈을 사용하기 위한 설정.

var fs = require('fs');
// 파일시스템을 제어 모듈을 사용하기 위한 설정.

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

app.set('views', './views_file');
// 템플릿 엔진의 파일들은 views_file폴더에 있다고 설정.

app.set('view engine', 'jade');
// 어떤 템플릿 엔진 설정할지 설정.

app.get('/topic/new', function(req, res) {
	// res.send('Route Test');
	fs.readdir('data_file', function(err, files) {
		if(err) {
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		res.render('new', {topics:files});
	});
});


app.get(['/topic','/topic/:id'], function(req, res) {
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
app.post('/topic', function(req, res) {
	// res.send('Router POST test');

	var title = req.body.title;
	var description = req.body.description;
	fs.writeFile('data_file/' + title, description, function(err) {
		if(err) {
			console.log(err);
			res.status(500).send('Internal Server Error');
			// err가 true라면 에러 상태코드를 500으로 하고
			// 에러 메시지를 Internal Server Error로 전달한다.
			// send()가 실행되면 다음 코드는 실행되지 않는다.
		}
		// res.send('Success');
		res.redirect('/topic/'+title);
	});
	// fs.writeFile() 메소드 설정.
	// fs.writeFile(file, data[, options], callback)
	// res.send(req.body.title);
});

app.listen(3300, function() {
	console.log('Connected, 3300 port! - test_Proj01.js');
});
