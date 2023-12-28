/*
строка s и подстрока t считываются из файла, передаваемого в качестве входного параметра командной строки
в формате: S пробел T

test 1
WHICH_FINALLY_HALTS.__AT_THAT_PIONT. AT_THAT
answer: 23

test 2
abccabcbbccabcdabcdabc abcdabc
answer: 12 16

test 3
колокольчик и колокол колокол
answer: 1 15

test 4
abaaaaaabcaaa aaaa
answer: 3 4 5

test 5
anananaananas ananas
answer: 8

*/

let fs = require('fs');
var input = fs.readFileSync(process.argv[2]).toString().split(" ");
let s = input[0];
let t = input[1];
let m = t.length;
let n = s.length;


alph=new Array()
//Определяем алфавит строки t
for(i=0;i<m;i++)
	alph[t.charAt(i)]=0
//В двумерном массиве del храним таблицу переходов
del=new Array(m+1)
for(j=0;j<=m;j++)
	del[j]=new Array()
//Инициализируем таблицу переходов
for(i in alph)
	del[0][i]=0
//Формируем таблицу переходов
for(j=0;j<m;j++){
	prev=del[j][t.charAt(j)]
	del[j][t.charAt(j)]=j+1
	for(i in alph)
	del[j+1][i]=del[prev][i]
}
//Выводим таблицу переходов
/*for(j=0; j<=m; j++){
	out=''
	for(i in alph)
		out+=del[j][i] + ' ';
	console.log(out);
}*/



pointer = 0;
for (i=0; i < n; i++){
	if (s[i] in alph) pointer = del[pointer][s[i]]
	else pointer = 0;
	if (pointer == m) console.log(i-m+2);
	//console.log(s[i], pointer)
}