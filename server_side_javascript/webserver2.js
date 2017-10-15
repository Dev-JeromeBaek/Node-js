

const http = require('http');

	// 웹서버가 되기 위해서는 Node-js가 지원하는 모듈 중에 'http'라는 모듈을 사용하면 됨.
	//	그리고 http 객체안에 여러변수를 갖고 있을텐데,
	//	createServer를 사용하여 서버를 만든다.


const hostname = '127.0.0.1';
const port = 3334;

	// 두번째 방법 - 기본형
var server = http.createServer(function(req, res)) {
	res.writeHead(200, { ' Content-Type': 'text/plain'});
	res.end('Hello World\n');
}

server.listen(port, hostname, function() {
	console.log('Server running at http://${hostname}:${post}/');
});