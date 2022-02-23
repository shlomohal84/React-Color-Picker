import sizes from "./sizes";

const PaletteStyles = {
  Palette: {
    height: "100vh",
    overflow: "hidden",
    flexDirection: "column",
  },
  colors: {
    height: "90%",
  },
  goBack: {
    width: "20%",
    height: "50%",
    margin: " -3.5px auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    opacity: 1,
    backgroundColor: "black",
    "& a": {
      color: "white",
      background: " rgba(255, 255, 255, 0.3)",
      width: "100px",
      height: "30px",
      position: "absolute",
      display: "inline-block",
      top: "50%",
      left: " 50%",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      outline: "none",
      fontSize: "1rem",
      lineHeight: "30px",
      textTransform: "uppercase",
      border: "none",
      textDecoration: "none",
    },
    [sizes.down("lg")]: {
      width: "25%",
      height: "33.3333%",
    },
    [sizes.down("md")]: {
      width: "50%",
      height: "20%",
    },
    [sizes.down("xs")]: {
      width: "100%",
      height: "10%",
    },
  },
};
export default PaletteStyles;
