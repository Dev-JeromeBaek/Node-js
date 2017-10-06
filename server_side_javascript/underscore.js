const _ = require('underscore');
	// underscore 모듈을 가져온 뒤 그 모듈을 사용할 수 있는 객체를 return해준다.
	// 그 객체를 받아 사용하면 됨.
	// underscore는 이름에 _(언더바)를 사용하자라는 약속이 정해져있음.

var arr = [3, 6, 9, 1, 12];

// 배열의 첫번재 값 확인 - 일반적인 javascript 사용
console.log(arr[0]);
// 배열의 첫번째 값 확인 - underscore 사용
console.log(_.first(arr));
// 배열의 마지막 값 확인 - 일반적인 javascript 사용
console.log(arr[arr.length-1]);
// 배열의 마지막 값 확인 - underscore 사용
console.log(_.last(arr));


