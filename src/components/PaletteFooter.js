import React from "react";

export default function PaletteFooter(props) {
  const { paletteName, emoji, isWindowsEmoji } = props;

  return (
    <footer className="Palette-footer">
      {paletteName}
      {isWindowsEmoji ? (
        <span className="emoji">{emoji}</span>
      ) : (
        <span className={`emoji fi fi-${emoji.toLowerCase()}`}></span>
      )}
    </footer>
  );
}
