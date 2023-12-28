/*
BoyerMoore_algorithm.js

строка S и подстрока T считываются из файла, передаваемого в качестве входного параметра командной строки
в формате: S пробел T

test 1
WHICH_FINALLY_HALTS.__AT_THAT_PIONT. AT_THAT
answer: 23

test 2
abccabcbbccabcdabcdabc abcdabc
answer: 12 16

test 3
abccdbcccbccabccabcc abccdbccabcc
answer: соответствий не найдено

test 4
abaaaaaabcaaa aaaa
answer: 3 4 5

*/

let fs = require('fs');
var input = fs.readFileSync(process.argv[2]).toString().split(" ");
let S = input[0];
let T = input[1];
let m = T.length;
let n = S.length;
N=new Array();
for(j=0;j<m;j++) N[T.charAt(j)]=j+1;
for(j=0;j<n;j++) if (!N[S[j]]) N[S[j]] = 0;

function rpr(l, T){
	let m = T.length;
	T_ = "*".repeat(m)+T;
	for (let k = m-l-1; k >= -m; k--){
		let flag = true;
		for (let j = 0; j < l; j++){
			if (T_[k+m+j] != '*' &&  T_[k+m+j] != T[m-l+j]) {flag = false; break;}
			
		}
		if (flag && ((k > 0 && T[k-1] != T[m-l-1]) || (k <= 0))) return k+1;
	}

}

let shift1, shift2, Char;
let i = 0;
let ans='';

while(i <= n-m){
	
	let flag = true;
	
	for (let l = 0; l < m; l++){
		
		Char = S[i+m-l-1];
		shift1 = Math.max(m - N[Char] - l , 1);	
		shift2 = m - rpr(l, T) - l + 1;
		
		if (T[m-l-1] != Char) {flag = false; break;}	
	}
	
	if (flag) ans += i+1 + ' ';
	
	i += Math.max(shift1, shift2)	
}

console.log(S, T);
if (ans.length == 0) console.log("соответствий не найдено")
else console.log('соответствия найдены на позициях ', ans);


