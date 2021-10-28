import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { Display } from "../components/Display";

configure({ adapter: new Adapter() });

describe("Display test", () => {
	let wrapper;

	beforeAll(() => {
		wrapper = shallow(<Display />);
	});

	it("Should render an empty string within the Display", () => {
		expect(wrapper.text()).toEqual("");
	});
});
