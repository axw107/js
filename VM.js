/*
документация к языку AssemPasc находится в текстовом файле documentation 
чтобы запустить файл поиска числа фиибоначи, необходимо раскомментить 13 строку и закоментить 10 в текущем файле
числа для служебных программ (nok.ap и fib.ap) не передаются, а устанавиваются непосредственно в самой прогрмме
nok.ap по умоланию ищет нок 3 и 33, чтобы это изменить необходимо открыть файл nok.ap и в 12 13 строках 
вместо 3 33 ввести интересующие числа соответсвенно (см. комментарий в соответствующем файле)
fib.ap по умолчанию ищет 10 число фиббоначи, чтобы это изменить в 6 строке соответсвующего файла необходимо 10 заменить на интересующее число
*/

let fs = require('fs');
let inText;

//запуск программы НОК
inText = fs.readFileSync('nok.ap');

//запуск программы поиска n - ого числа Фиб.
//inText = fs.readFileSync('fib.ap');
inText = inText.toString().split('\n');
let mem = new Array();
for (let i = 0; i < inText.length - 1; i++) mem = mem.concat(inText[i].replace('\r', '').split(' '));
if (mem[mem.length] != 'end') mem.push('end');
let flag;
let ip = mem.indexOf('var')+1;
let variables = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];
//console.log(mem)
while (mem[ip] != 'end') {
	//console.log('v', variables);
	//console.log(mem[ip])
	switch (mem[ip]) {
		//ввод input <номер ячейки> <значение>
		case 'input':
			variables[mem[ip+1]/1] = mem[ip+2]/1;
			ip += 3;
			break;
		//вывод 
		case 'output':
			console.log(variables[mem[ip+1]/1]);
			ip += 2;
			break;
		//присваивание ячейкиi значение ячейкиj
		case 'ass':
			variables[mem[ip+1]/1] = variables[mem[ip+2]/1];
			ip += 3;
			break;
		//вычитание
		case 'sub':
			variables[mem[ip+1]/1] = variables[mem[ip+1]/1] - variables[mem[ip+2]/1];
			ip += 3;
			break;
		//умножение
		case 'mul':
			variables[mem[ip+1]/1] = variables[mem[ip+1]/1] * variables[mem[ip+2]/1];
			ip += 3;
			break;
		case 'div':
			variables[mem[ip+1]/1] = variables[mem[ip+1]/1] / variables[mem[ip+2]/1];
			ip += 3;
			break;
		//сложение
		case 'add':
			variables[mem[ip+1]/1] = variables[mem[ip+1]/1] + variables[mem[ip+2]/1];
			ip += 3;
			break;
		// == ?
		case 'cmp':
			if (variables[mem[ip+1]/1] == variables[mem[ip+2]/1]) flag = true;
			else flag = false;
			ip += 3;
			break;
		// > ?
		case 'more':
			if (variables[mem[ip+1]/1] > variables[mem[ip+2]/1]) flag = true;
			else flag = false;
			ip += 3;
			break;
		//переход к флагу
		case 'je':
			if (flag) ip = mem.indexOf((mem[ip+1]) + ':')+1;
			else ip += 2;
			break;
		//переход к началу/концу основного тела программы
		case 'jmp':
			if ((mem[ip+1]) == '@begin') ip = mem.indexOf('begin')+1;
			else ip = mem.indexOf('end');
			break;
		// пропуск ненужного
		default:
			ip += 1;
			break;
		//console.log('v', variables);
	}
}