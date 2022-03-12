import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { generatePalette } from "./colorsHelpers";
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AnimatePresence } from "framer-motion";
import Page from "./components/Page";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import NewPaletteForm from "./components/NewPaletteForm";

import seedColors from "./seedColors";

import "./components/styles/Page.css";
import "./App.css";

const App = () => {
  const location = useLocation();
  const theme = createTheme();
  const [palettes, setPalettes] = useState(
    JSON.parse(window.localStorage.getItem("palettes")) || seedColors
  );
  useEffect(() => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }, [palettes]);

  function findPalette(id) {
    return palettes.find((palette) => {
      return palette.id === id;
    });
  }

  function handleGenerate(id) {
    return generatePalette(findPalette(id));
  }

  function savePalette(newPalette) {
    setPalettes([...palettes, newPalette]);
    syncLocalStorage();
  }

  function syncLocalStorage() {
    //save palettes to local storage
    return window.localStorage.setItem("palettes", JSON.stringify(palettes));
  }

  function deletePalette(id) {
    setPalettes(palettes.filter((palette) => palette.id !== id));
    syncLocalStorage();
  }

  return (
    // <TransitionGroup>
    //   <CSSTransition in={showPage} classNames="page" timeout={500}>
    <ThemeProvider theme={theme}>
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route
            path="/"
            element={
              <Page>
                <PaletteList
                  palettes={palettes}
                  deletePalette={deletePalette}
                />
              </Page>
            }
          />
          <Route
            path="/palette/new"
            element={
              <Page>
                <NewPaletteForm savePalette={savePalette} palettes={palettes} />
              </Page>
            }
          />
          <Route
            path="/palette/:paletteID"
            element={
              <Page>
                <Palette palette={handleGenerate} />
              </Page>
            }
          />

          <Route
            path="/palette/:paletteID/:colorID"
            element={
              <Page>
                <SingleColorPalette palette={handleGenerate} />
              </Page>
            }
          />

          {/* default/404 route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
    //  </CSSTransition>
    //  </TransitionGroup>
  );
};

export default App;
