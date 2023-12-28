/*
ПРОГРАММА СЧИТЫВАЕТ АРИФМЕТИЧЕСКОЕ ВЫРАЖЕНИЕ (БЕЗ ПРОБЕЛОВ) ИЗ ФАЙЛА 'input_dijkstra.txt'. ЧИСЛА ОДНОЗНАЧНЫЕ БЕЗЗНАКОВЫЕ.
ЛЕВАЯ АССОЦИАТИВНОСТЬ СТЕПЕНЕЙ. (2^2^3 = 64)
*/

function isNumber(x) {return !isNaN(x)};

const priority = {     
	"+": 1, 
	"-": 1,
	"*": 2, 
	"/": 2,
	"^": 3,
	"(": 4
};

let fs = require('fs');
var str = fs.readFileSync('input_dijkstra.txt').toString();

//преобразование арифмитического выражения в обраную польскую нотацию
let out = [];
let stack = [];
for (let i = 0; i < str.length; i++){
	if (isNumber(str[i])) out.push(str[i]);
	else {
		if (stack.length==0 || str[i]=="(") stack.push(str[i]);
		else {
			if (str[i] == ')') {
				while (stack.at(-1) != '(') {out.push(stack.at(-1)); stack.pop();}
				stack.pop();
			}
			else if (priority[stack.at(-1)] < priority[str[i]]) stack.push(str[i]);
			else {
				while (priority[stack.at(-1)] >= priority[str[i]] && stack.at(-1) != '(') {out.push(stack.at(-1)); stack.pop();}
				stack.push(str[i]);
			}
		}		
	}
	//console.log(str[i]);
	//console.log(out);
	//console.log(stack);
}
while (stack.length != 0) {out.push(stack.at(-1)); stack.pop();}

console.log(str)
console.log(out.join(""))


//вычисление выражения
function ToDoOperation(operator, operand1, operand2){
	if (operator == '+') return operand1+operand2;
	if (operator == '-') return operand1-operand2;
	if (operator == '*') return operand1*operand2;
	if (operator == '/') return operand1/operand2;
	if (operator == '^') return operand1**operand2;
}

stack = [];
for (let i = 0; i < out.length; i++){
	if (isNumber(out[i])) stack.push(out[i]);
	else {
		let result = ToDoOperation(out[i], stack.at(-2)-0, stack.at(-1)-0);
		stack.pop();
		stack.pop();
		stack.push(result)
	}
	//console.log(stack)
}
console.log("The answer is ", stack[0])
console.log("ans (eval) = ", eval(str.replaceAll("^", "**")));
console.log("\nОБРАТИТЕ ВНИМАНИЕ!\nПРОГРАММА СЧИТЫВАЕТ АРИФМЕТИЧЕСКОЕ ВЫРАЖЕНИЕ (БЕЗ ПРОБЕЛОВ) ИЗ ФАЙЛА 'input_dijkstra.txt'.\nЧИСЛА ОДНОЗНАЧНЫЕ БЕЗЗНАКОВЫЕ.\nЛЕВАЯ АССОЦИАТИВНОСТЬ СТЕПЕНЕЙ. (2^2^3 = 64)")