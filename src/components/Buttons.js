import React from "react";

export const Buttons = ({ value, handleOperation }) => {
	return (
		<div className="buttons">
			<button className="button" key={value} onClick={() => handleOperation(value)}>
				{value}
			</button>
		</div>
	);
};
