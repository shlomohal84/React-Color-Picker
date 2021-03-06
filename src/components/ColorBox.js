import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import classNames from "classnames";

import styles from "./styles/ColorBoxStyles";
import { makeStyles } from "@mui/styles";

const ColorBox = (props) => {
  const { name, background, moreUrl, showingFullPalette } = props;
  const useStyles = makeStyles((theme) => styles(props));
  const classes = useStyles();
  const [copied, setCopied] = useState(false);

  function changeCopyState() {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }
  return (
    <CopyToClipboard text={background} onCopy={changeCopyState}>
      <div className={classes.ColorBox} style={{ background }}>
        <div
          className={classNames(classes.copyOverlay, {
            [classes.showOverlay]: copied,
          })}
          style={{ background }}
        />

        <div
          className={classNames(classes.copyMessage, {
            [classes.showMessage]: copied,
          })}
        >
          <h1>copied!</h1>
          <p className={classes.copyText}>{background}</p>
        </div>
        <div>
          <div className={classes.boxContent}>
            <span className={classes.colorName}>{name}</span>
          </div>
          <button className={classes.copyButton}>Copy</button>
        </div>
        {showingFullPalette && (
          <Link to={moreUrl} onClick={(evt) => evt.stopPropagation()}>
            <span className={classes.seeMore}>MORE</span>
          </Link>
        )}
      </div>
    </CopyToClipboard>
  );
};

export default ColorBox;
