import React, { Component } from "react";

import Navbar from "./Navbar";
import ColorBox from "./ColorBox";

import "./Palette.css";
export default class Palette extends Component {
	constructor(props) {
		super(props);
		this.state = { level: 500 };
		this.changeLevel = this.changeLevel.bind(this)
	}
	changeLevel(level) {
		this.setState({ level })
	}

	render() {
		const { colors } = this.props.palette;
		const { level } = this.state
		const colorBoxes = colors[level].map(
			(color) => (
				<ColorBox key={color.name} background={color.hex} name={color.name} changeLevel={this.changeLevel} />
			)
		);
		return (
			<div className="Palette">
				<Navbar level={level} changeLevel={this.changeLevel} />
				<div className="Palette-colors">{colorBoxes}</div>
				{/* Footer  */}
			</div>
		);
	}
}
