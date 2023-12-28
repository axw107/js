/*
программа принимает на вход строку, состоящую из не менее чем двух различных элементов,
в качестве аргумента командной строки;
осущесвляет префиксное кодирование алфавита с минимальной избыточностью
и выводит закодированную строку
*/


var str = process.argv[2].toString()

function Node(letter, freq, father, code, used){
	this.letter = letter;
	this.freq = freq;
	this.father = father;
	this.code = code;
	this.used = used;
}

//Определяем алфавит строки 
alph=new Array();
for(i=0;i<str.length;i++)
	alph[str.charAt(i)]=0;
for(i=0;i<str.length;i++) {
	alph[str.charAt(i)]++;	
}
//console.log(alph);


//инициализация дерева
tree = new Array();

for (let i in alph){
	let n = new Node(i, alph[i], null, undefined, 0);
	tree.push(n);
}
let sizeOfAlph = tree.length;

//функция поиска элемента с минимальной частотой, который еще не был использован
function FindMin(tree, n){
	for (j=0; j < n; j++)
		if (tree[j].used == 0) {index = j; break}
	for (j=0; j < n; j++)
		if (tree[j].used == 0 && tree[j].freq < tree[index].freq) index = j;
	tree[index].used = 1;
	return index;
}

//обработка двух наименьших элементов
ind1 = FindMin(tree, sizeOfAlph);
ind2 = FindMin(tree, sizeOfAlph);
tree[ind1].code = 1;
tree[ind2].code = 0;
tree[ind1].father = tree.length;
tree[ind2].father = tree.length;
let n = new Node(tree[ind1].letter + tree[ind2].letter, tree[ind1].freq + tree[ind2].freq, null, 0, 1);
tree.push(n)


//обработка всех остальных элементов
for (i = 1; i < sizeOfAlph-1; i++){
	ind = FindMin(tree, sizeOfAlph);
	n = new Node(tree[ind].letter + tree[tree.length - 1].letter, tree[ind].freq + tree[tree.length - 1].freq, null, i%2, 1);
	tree[ind].code = 1-tree[tree.length - 1].code;
	tree[ind].father = tree.length;
	tree[tree.length - 1].father = tree.length;
	tree.push(n)
}
tree.pop();
//console.log(tree);

//сборка кодов символов
codes = new Array();
for (i=0; i < sizeOfAlph; i++){
	let cod = tree[i].code.toString();
	let todo = tree[i].father;
	while (true){
		if (todo==sizeOfAlph*2-2) break;
		cod += tree[todo].code;
		todo = tree[todo].father;	
	}
	codes[tree[i].letter] = cod.split("").reverse().join("");
}
console.log(codes);


// кодирование строки
encoded_string = '';
for (i=0; i < str.length; i++) encoded_string+=codes[str[i]]; 
console.log("encoded: ", encoded_string);