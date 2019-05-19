const consoleTable = require('console.table');

const table = [
	['*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*'],
	['*',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'*',	'*',	'*',	'*'],
	['*',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'1',	'*',	'*',	'*',	'*'],
	['*',	'0',	'0',	'0',	'1',	'1',	'1',	'0',	'1',	'1',	'1',	'1',	'*',	'*',	'*',	'*'],
	['*',	'1',	'1',	'1',	'1',	'1',	'1',	'1',	'1',	'1',	'1',	'1',	'*',	'*',	'*',	'*'],
	['*',	'1',	'1',	'1',	'1',	'1',	'1',	'1',	'0',	'0',	'0',	'0',	'*',	'*',	'*',	'*'],
	['*',	'1',	'1',	'1',	'1',	'1',	'1',	'1',	'0',	'0',	'0',	'0',	'*',	'*',	'*',	'*'],
	['*',	'0',	'0',	'0',	'1',	'1',	'1',	'1',	'0',	'0',	'0',	'0',	'*',	'*',	'*',	'*'],
	['*',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'*',	'*',	'*',	'*'],
	['*',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'*',	'*',	'*',	'*'],
	['*',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'*',	'*',	'*',	'*'],
	['*',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'0',	'*',	'*',	'*',	'*'],
	['*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*'],
	['*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*'],
	['*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*'],
	['*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*',	'*'],
];


const Xs = [
	'X8', 'X7', 'X6', 'X5', 'X4', 'X3', 'X2', 'X1',
];

const yourXs = [
	'X8', 'X6', 'X5', 'X2', 'X1', 'X3', 'X4', 'X7', //'X8', 'X5', 'X7', 'X1', 'X2', 'X3', 'X4', 'X6'
];

const values = [];
const yourValues = [];
const result = [];

table.forEach((row, i) => {
	row.forEach((cell, j) => {
		const val = dec2bin(i * row.length + j);

		values.push([
			i * row.length + j, 
			val.padStart(8, '0'),
			findColumn(val.padStart(8, '0'), Xs), 
			cell,
		]);
	});
});



table.forEach((row, i) => {
	const buf = [];

	row.forEach((cell, j) => {
		const val = dec2bin(i * row.length + j).padStart(8, '0');
		const bufXs = findColumn(val.padStart(8, '0'), yourXs);

		const yourVal = values.find(v => (
				v[2].length === bufXs.length && 
				v[2].every(item => bufXs.includes(item))
		));

		buf.push(
			yourVal[3]
		);

		yourValues.push([
			i * row.length + j, 
			val,
			bufXs, 
			cell,
		]);
	});

	if (i % 4 === 0) {
		result.push([]);
	}

	result.push(buf); //.join(',')
});

console.log('Table');
console.table(
	['Position', 'Bin', 'Xs', 'Value'],
	values,
)

console.log('Your Table');
console.table(
	['Position', 'Bin', 'Xs', 'Value'],
	yourValues,
);

console.log('Table');
console.table(table);

console.log('Result');
console.table(result);


function findColumn(val, Xs) {
	const result = [];

	for (let i in val) {
		if (val[i] === '1') {
			result.push(Xs[i]);
		}
	}

	return result;
}

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}


