var express = require('express');
var app = express();

// 정적인 파일이 위치할 디렉터리를 지정하는 기능.
app.use(express.static('public'));
// public : 디렉터리명.

// get, post 방식의 호출에 대한 함수
// get, post 함수에 대한 콜백함수에는 request와 response가 반환된다.
app.get('/', function(req, res) {
	res.send('Hello Home Page!');
});

app.get('/dynamic', function(req, res) {
	var time = Date();
	var lis = '';
	for(var i=0; i<5; i++) {
		lis = lis + '<li>repeat Message'+i+'</li>';
	}
	var output = `
	<html>
	<head>
		<meta charset="UTF-8">
		<title>static</title>
	</head>
	<body>
		<h1>Hello, Dynamic</h1>
		<h2>New Message!</h2>

		${lis}

		${time}
	</body>
	</html>`;
	res.send(output);
});

app.get('/route', function(req, res) {
	res.send('Hello Router, <img src="/ex01.jpg">')
});

// get, post함수를 'router'라고 한다. route : 길을 찾는다.
// get, post함수가 하는 일을 'routing 한다' 라고 한다.
// 요청에 대한 연결을 해주는 역할.
app.get('/login', function(req, res) {
	res.send('<h1>Login Please!</h1>');
});

// 3000번 포트로의 접속 확인.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
  console.log('Connected 3000 port!');
});