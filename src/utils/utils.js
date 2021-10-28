export const calculate = {
	"+": (firstValue, secondValue) => firstValue + secondValue,
	"-": (firstValue, secondValue) => firstValue - secondValue,
	"/": (firstValue, secondValue) => firstValue / secondValue,
	X: (firstValue, secondValue) => firstValue * secondValue,
	C: (firstValue, secondValue, operator) =>
		clear(firstValue, secondValue, operator),
	"=": (firstValue, secondValue) => (firstValue = secondValue),
	"+-": (secondValue, setSecondValue) =>
		changeSign(secondValue, setSecondValue),
	".": (secondValue, setSecondValue) =>
		insertDecimal(secondValue, setSecondValue),
	"%": (first, second, firstValue, secondValue) =>
		toPercentage(first, second, firstValue, secondValue),
};

export const values = [
	["C", "+-", "%", "/"],
	[7, 8, 9, "X"],
	[4, 5, 6, "-"],
	[1, 2, 3, "+"],
	[0, ".", "="],
];

export const clear = (firstValue, secondValue, operator) => {
	firstValue(null);
	secondValue("");
	operator(null);
};

export const changeSign = (value, secondValue, operator) => {
	secondValue(parseFloat(value) * -1);
	operator(null);
};

export const insertDecimal = (value, secondValue, operator) => {
	value.indexOf(".") === -1 ? secondValue(value + ".") : secondValue(value);
	operator(null);
};

export const toPercentage = (
	first,
	second,
	firstValue,
	secondValue,
	operator
) => {
	secondValue(parseFloat(second) / 100);
	operator(null);
	if (first && second === "") firstValue(parseFloat(first));
};
