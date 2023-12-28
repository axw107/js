
let fs = require('fs');
let str;
str = fs.readFileSync('input.txt');
str = str.toString();
const isNumeric = n => !!Number(n)
//console.log(isNumeric(str));

function convertToIEEE754(num) {
	let sign = String(1-(num>0));
	let order;
	let mantissa;
	if (((2 - 2**(-23))*2**127 - Math.abs(num)) > 0) {
		console.log('hi');
		let num2 = Math.abs(num).toString(2);
		if (num % 1 == 0) { 
			order = num2.length - 1;
			num2 += '0';
			mantissa = num2.slice(1, 24);
		}
		else {
			let num3 = num2.replace('.', '');
			order = num2.indexOf('.') - num2.indexOf('1') - (Math.abs(num) >= 1);
			mantissa = num3.slice(Math.abs(num2.indexOf('.') - order), Math.abs(num2.indexOf('.') - order) + 23);
		}
		  //console.log(num2, order);
		order = (order+127).toString(2).padStart(8, '0');
		  //console.log("ord", order);
		  //console.log("mantissa", mantissa);
		mantissa += '0'.repeat(23-mantissa.length);
		  //console.log(mantissa);
		  //console.log(sign);
	}
	else {
		console.log('ytrrhgffghgfd')
		order = '1'.repeat(8);
		mantissa = '0'.repeat(23);
	}
	//console.log('i am here');
	//console.log(sign + " " + order + " " );
	//console.log('ans', sign+" "+order+" "+mantissa);
	return sign+" "+order+" "+mantissa;
}

let ans;
try {
	console.log(eval(str));
	let num = Number(eval(str));
	if (num==0) ans = '0 00000000 00000000000000000000000';
	else ans = convertToIEEE754(num);

} catch (err) {
	ans = '0 11111111 10000000000000000000000';
	//console.log("fvjfgj")

}
console.log(ans);
fs.writeFile('out.txt', ans, 'utf-8', (err) => {});
console.log(( 00010000000000000000000 + 01100000000000000000000).toString(2));

