import React, { Component } from "react";
import { ChromePicker } from "react-color";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import withStyles from "@material-ui/styles/withStyles";
const styles = {};
class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = { currentColor: "teal", newColorName: "" };
    this.updateCurrentColor = this.updateCurrentColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    );
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  updateCurrentColor(newColor) {
    this.setState({ currentColor: newColor.hex });
  }

  handleSubmit() {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName,
    };

    this.setState({ newColorName: "" });
    this.props.addNewColor(newColor);
  }
  render() {
    const { paletteIsFull } = this.props;
    const { currentColor, newColorName } = this.state;
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
          disableAlpha={true}
        />
        <ValidatorForm onSubmit={this.handleSubmit} ref="form">
          <TextValidator
            name="newColorName"
            value={newColorName}
            onChange={this.handleChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "Enter a color name",
              "Color name must be unique",
              "Color already being used!",
            ]}
          />
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: paletteIsFull ? "grey" : this.state.currentColor,
            }}
            type="submit"
            disabled={paletteIsFull}
          >
            {paletteIsFull ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
