let fs = require('fs');
var str = fs.readFileSync('input.txt').toString().split(" ");
let s = str[0];
let t = str[1];
let n = s.length;
let m = t.length;
console.log("s = ", s);
console.log("t = ", t);

//функция сравнения строк равной длины
function str1_is_str2(str1, str2, len_str) {
	let j = 0;
	while (str1[j]==str2[j]){
		if (j==len_str-1) return true;
		j++;
	}
	return false;
}

//brute force
console.log("brute force");
let i = 0;
while(i <= n-m) {
	if (str1_is_str2(s.slice(i, i+m), t, m)) console.log(i) ;
	i++
}

//hash. Алгоритм Рабина — Карпа.
console.log("hash. Алгоритм Рабина — Карпа")
//вычисляем h(t)
let h_t = 0;
for (let i = 0; i < m; i++) h_t += t.charCodeAt(i)*(2**(n-i-1))

//вычисляем h(s)
let h_s = [0];
for (let i = 0; i < m; i++) h_s[0] += s.charCodeAt(i)*(2**(n-i-1))
for (let i = 1; i <= n-m; i++) h_s[i] = (h_s[i-1] - s.charCodeAt(i-1)*2**(n-1))*2+s.charCodeAt(i+m-1)*2**(n-m);

for (let i = 0; i <= n-m; i++){
	if (h_s[i] == h_t) if (str1_is_str2(s.slice(i, i+m), t, m)) console.log(i);
}