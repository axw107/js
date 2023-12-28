
var str = process.argv[2].toString()

//Определяем алфавит строки 
alph=new Array();
for(i=0;i<str.length;i++)
	alph[str.charAt(i)]=0;
for(i=0;i<str.length;i++) {
	alph[str.charAt(i)]++;	
}

let sizeOfalph = 0;
for (i in alph) sizeOfalph++;

let H = 0;
for (i in alph){
	p = alph[i]/str.length;
	console.log(i, p)
	if (sizeOfalph > 1) H -= p*(Math.log(p) / Math.log(sizeOfalph));
	
}
console.log("энтропия: ", H);