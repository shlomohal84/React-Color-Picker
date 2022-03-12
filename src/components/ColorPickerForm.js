import { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import styles from "./styles/ColorPickerFormStyles";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => styles);

const ColorPickerForm = ({ paletteIsFull, colors, addNewColor }) => {
  const classes = useStyles();
  const [input, setInput] = useState({
    currentColor: "teal",
    newColorName: "",
  });
  const { currentColor, newColorName } = input;

  useEffect(() => {
    ValidatorForm.addValidationRule(
      "isColorNameUnique",

      (value) =>
        colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );
    ValidatorForm.addValidationRule("isColorUnique", (value) =>
      colors.every(({ color }) => color !== currentColor)
    );
  });

  function handleChange(evt) {
    setInput({ ...input, [evt.target.name]: evt.target.value });
  }

  function updateCurrentColor(newColor) {
    setInput({ ...input, currentColor: newColor.hex });
  }

  function handleSubmit() {
    const newColor = {
      color: currentColor,
      name: newColorName,
    };
    setInput({ ...input, newColorName: "" });
    addNewColor(newColor);
  }
  return (
    <div className={classes.root}>
      <ChromePicker
        color={currentColor}
        onChangeComplete={updateCurrentColor}
        disableAlpha={true}
        className={classes.picker}
        ref={useRef("form")}
      />
      <ValidatorForm
        ref={useRef("form")}
        onSubmit={handleSubmit}
        instantValidate={false}
      >
        <TextValidator
          ref={useRef("form")}
          placeholder="Color Name"
          margin="normal"
          variant="filled"
          className={classes.colorNameInput}
          name="newColorName"
          value={newColorName}
          onChange={handleChange}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Enter a color name",
            "Color name must be unique",
            "Color already being used!",
          ]}
        />
        <Button
          sx={{
            fontSize: "2rem",
            height: "4rem",
          }}
          className={classes.addColor}
          variant="contained"
          color="primary"
          style={{
            backgroundColor: paletteIsFull ? "grey" : currentColor,
          }}
          type="submit"
          disabled={paletteIsFull}
        >
          {paletteIsFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default ColorPickerForm;
