import React, { useState, useEffect } from "react";
import {
	calculate,
	values,
	clear,
	changeSign,
	insertDecimal,
	toPercentage,
} from "../utils/utils";
import { Display } from "./Display";
import { Buttons } from "./Buttons";
import { Keypad } from "./Keypad";

export const Calculator = () => {
	/* 
  three basic pieces of state for a calculator "num1" "num2" "operator"; slightly unintuitive since num1 is set to null 
  until an operator is pressed, which then frees up num2 for another input. the two are then evaluated when = is pressed
  with the appropriate operator in the calculate module
  */

	const [firstValue, setFirstValue] = useState(null);
	const [secondValue, setSecondValue] = useState("");
	const [operator, setOperator] = useState(null);
	/*
  useEffect triggers when the dependencies are present and/or change
  */

	useEffect(() => {}, [firstValue, secondValue, operator]);

	const handleNums = (num) => {
		setSecondValue(secondValue === "" ? num.toString() : secondValue + num);
	};

	/*
  handleOperation is the click handler takes in a couple of imported functions from the utils.js file and accounts for all
  buttons that exist on the calculator; initially wanted to keep the modifiers like clear, +-, ., and % in a seprate module
  to keep it cleaner, however, this still works fine
  */
	const handleOperation = (value) => {
		if (Number.isInteger(value)) {
			handleNums(parseInt(value, 10));
		} else if (value in calculate) {
			if (operator === null) {
				setOperator(value);
				setFirstValue(secondValue);
				setSecondValue("");
			}
			if (operator) {
				setOperator(value);
			}
			if (firstValue && operator && secondValue) {
				calculateOperation(firstValue, secondValue);
			} else if (value === "C") {
				clear(setFirstValue, setSecondValue, setOperator);
			} else if (value === "+-") {
				changeSign(secondValue, setSecondValue, setOperator);
			} else if (value === ".") {
				insertDecimal(secondValue, setSecondValue, setOperator);
			} else if (value === "%") {
				toPercentage(
					firstValue,
					secondValue,
					setFirstValue,
					setSecondValue,
					setOperator
				);
			}
		}
	};

	/*
  kept calculate operation within the component but this essentially looks up the value of the button and performs the operation
  according encapsulated function and resets state values except for num2 (the answer) to the Display component
  */
	const calculateOperation = (firstValue, secondValue) => {
		let theOperation = calculate[operator](
			parseFloat(firstValue),
			parseFloat(secondValue)
		);
		setOperator(null);
		setSecondValue(theOperation.toString());
		setFirstValue(null);
	};

	return (
		<div className="calculator">
			<Display secondValue={secondValue} />
			<Keypad
				keys={values.flat().map((key, i) => {
					return (
						<Buttons key={i} value={key} handleOperation={handleOperation} />
					);
				})}
			/>
		</div>
	);
};
