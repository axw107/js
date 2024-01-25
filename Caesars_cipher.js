/*
сдвииг передается в качестве параметра командной строки 
текст считывается из файла input_text.txt
канонические частоты считываются из sf.txt
*/
function isLetter(ch) {
  return ch.toLowerCase() !== ch.toUpperCase();
}
function isUpperCase(str) {
  return str === str.toUpperCase();
}

let fs = require('fs');
var text = fs.readFileSync('input_text.txt').toString();
let shift = process.argv[2] - 0;
let n = text.length;
let encoded_text = "";
//console.log(text);

//считваем канонические частоты из файла sf.txt и составляем словарь
let SF = new Map();
var sf = fs.readFileSync('sf.txt').toString().split("\r\n");
m = sf.length;
for (let i = 0; i < m; i++){
	SF.set(sf[i].split(" ")[0], sf[i].split(" ")[1]-0);
}

let alfa = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
let ALFA = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"

//кодируем текст в соответсвии с переданным сдвигом
let countOfLetters = 0;
for (let i = 0; i < n; i++){
	if (isLetter(text[i])) {
		if (isUpperCase(text[i])) encoded_text += ALFA[(ALFA.indexOf(text[i]) + shift)%33];
		else encoded_text += alfa[(alfa.indexOf(text[i]) + shift)%33];
		countOfLetters++;
	}
	else encoded_text += text[i];
}
//console.log(encoded_text);

//составляем словарь фактических частот
let FF = new Map();
for (let i = 0; i < 33; i++) FF.set(alfa[i], 0)
for (let i = 0; i < n; i++){
	if (isLetter(encoded_text[i])) FF.set(encoded_text[i], FF.get(encoded_text[i])+1);
}
for (let i = 0; i < 33; i++) FF.set(alfa[i], (FF.get(alfa[i])/countOfLetters*100).toFixed(2)-0);
	
//выясняем сдвиг	
let f_from_shift;
let min_f_from_shift=9999999999;
let myshift;
for (let shift = 0; shift < 33; shift++){
	f_from_shift = 0;
	for (let i = 0; i < 33; i++){
		f_from_shift += (SF.get(alfa[i]) - FF.get(alfa[(i+shift)%33]))**2;
	}
	//console.log(shift, f_from_shift);
	if (f_from_shift < min_f_from_shift){
		min_f_from_shift = f_from_shift;
		myshift = shift;
	}
}
//console.log(encoded_text);
console.log("предполагаемый сдвиг:", myshift, '\n');

//декодирование
decoded_text = "";
for (let i = 0; i < n; i++){
	if (isLetter(encoded_text[i])){
		if (isUpperCase(encoded_text[i])) decoded_text += ALFA[(ALFA.indexOf(encoded_text[i])+33 - shift)%33];
		else decoded_text += alfa[(alfa.indexOf(encoded_text[i])+33 - shift)%33];
	}
	else decoded_text += encoded_text[i];
}
console.log("раскодированный текст в соответствии с предполагаемым сдвигом\n");
console.log(decoded_text);
