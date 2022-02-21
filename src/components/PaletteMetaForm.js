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
      open: true,
      newPaletteName: "",
    };
    this.handleChange = this.handleChange.bind(this);
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
    this.setState({ open: false }, this.props.showForm);
  };

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  render() {
    const { newPaletteName } = this.state;
    const { handleSubmit } = this.props;

    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)} ref="form">
          <DialogTitle id="form-dialog-title">
            Choose A Palette Name
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your new palette name. Make sure it's unique!
            </DialogContentText>
            <Picker />
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
    );
  }
}

export default PaletteMetaForm;
