import { useState, useEffect } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Picker } from "emoji-mart";

import "emoji-mart/css/emoji-mart.css";

const PaletteMetaForm = ({ palettes, handleSubmit, toggleShowForm }) => {
  useEffect(() => {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  });

  const [stage, setStage] = useState("form");
  const [inputs, setInputs] = useState({ newPaletteName: "", emoji: "" });
  const { newPaletteName } = inputs;

  const handleClose = () => {
    setStage("");
    toggleShowForm();
  };

  function handleChange(evt) {
    setInputs({ ...inputs, [evt.target.name]: evt.target.value });
  }

  function showEmojiPicker() {
    setStage("emoji");
  }
  function savePalette(emoji) {
    const newPalette = {
      paletteName: newPaletteName,
      emoji: emoji.native,
    };
    handleSubmit(newPalette);
    setStage("");
  }

  return (
    <div>
      <Dialog open={stage === "emoji"} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Pick a Palette Emoji</DialogTitle>
        <Picker onSelect={savePalette} title="Emoji Preview" />
      </Dialog>
      <Dialog
        open={stage === "form"}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogTitle id="form-dialog-title">
            Choose A Palette Name
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your new palette name. Make sure it's unique!
            </DialogContentText>
            <TextValidator
              fullWidth
              margin="normal"
              label="Palette Name"
              value={newPaletteName}
              name="newPaletteName"
              onChange={handleChange}
              validators={["required", "isPaletteNameUnique"]}
              errorMessages={[
                "Enter a palette name",
                "Palette name is already taken",
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Palette
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};
export default PaletteMetaForm;
