let string = '{"score": -1, "answer":"無關於薩爾達傳說"}';
let data = JSON.parse(string);

console.log(string);
console.log(data);

console.log(data.score + 1);