import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { values } from "../utils/utils";
import { Buttons } from "../components/Buttons";
import { Keypad } from "../components/Keypad";

configure({ adapter: new Adapter() });

describe("Keypad tests", () => {
	let wrapper;
	const mocks = jest.fn();

	beforeAll(() => {
		wrapper = shallow(
			<Keypad
				keys={values.flat().map((key, i) => {
					return <Buttons key={i} value={key} onClick={mocks} />;
				})}
			/>
		);
	});

	it("Should return the number of buttons on the calculator", () => {
		expect(wrapper.find(Buttons)).toHaveLength(19);
	});

	it("Should have the className of keypad", () => {
		expect(wrapper.hasClass("keypad")).toBe(true);
	});

	it("Should have all buttons as clickable events", () => {
		wrapper.find(Buttons).forEach((node) => node.simulate("click"));
		expect(mocks.mock.calls).toHaveLength(19);
	});
});

describe("Button tests", () => {
	let wrapper;

	beforeAll(() => {
		wrapper = shallow(<Buttons />);
	});

	it("Should render a button type", () => {
		expect(wrapper.find("button").type()).toEqual("button");
	});
});
