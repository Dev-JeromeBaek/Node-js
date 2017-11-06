// express 사용하기

var express = require('express');
var app = express();

app.locals.pretty = true;

// 템플릿 엔진을 설정한다.
// 여기서 'view engine'은 템플릿 엔진을 의미함. ( 약속된 사항 )
app.set('view engine', 'jade');
// 템플릿 엔진으로 jade라는 모듈을 사용하겠다는 의미.
// 설치한 jade 모듈과 express를 연결하는 코드.

// 템플릿 파일들을 관리할 기본 디렉터리로 views 디렉터리를 지정한다.
app.set('views', './views');
// 위 코드를 생략하더라도 express는 기본적으로 
// 기본값으로 설정해 놓고있지만 확실히 명시해주는 것이 좋음.

// 정적인 파일이 위치할 디렉터리를 지정하는 기능.
app.use(express.static('public'));
// public : 디렉터리명.

// 쿼리스트링 이용하기.
app.get('/topic', function(req, res) {
	res.send(req.query.id+','+req.query.name);
});

app.get('/template', function(req, res) {
	res.render('temp', {time:Date(), _title:'Node_Jerome'});	
	// express가 템플릿을 렌더링한다.
	// '/template' 이라는 경로를 통해서 들어온 
	// 클라이언트에게 해당 함수를 실행시켜 주면서 
	// temp라는 템플릿 파일을 웹페이지로 렌더링 해서 전달한다는 의미.
});

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
	res.send('Hello Router, <img src="/ex01.jpg">');
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
