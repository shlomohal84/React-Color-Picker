import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Picker } from "emoji-mart";

import "emoji-mart/css/emoji-mart.css";

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: "form",
      newPaletteName: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.showEmojiPicker = this.showEmojiPicker.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false }, this.props.toggleShowForm);
  };

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  showEmojiPicker() {
    this.setState({ stage: "emoji" });
  }
  savePalette(emoji) {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native,
    };
    this.props.handleSubmit(newPalette);
    this.setState({ stage: "" });
  }

  render() {
    const { newPaletteName, stage } = this.state;

    return (
      <div>
        <Dialog open={stage === "emoji"} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">Pick a Palette Emoji</DialogTitle>
          <Picker onSelect={this.savePalette} title="Emoji Preview" />
        </Dialog>
        <Dialog
          open={stage === "form"}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <ValidatorForm onSubmit={this.showEmojiPicker}>
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
                onChange={this.handleChange}
                validators={["required", "isPaletteNameUnique"]}
                errorMessages={[
                  "Enter a palette name",
                  "Palette name is already taken",
                ]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
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
  }
}

export default PaletteMetaForm;
