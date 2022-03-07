import { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { generatePalette } from "./colorsHelpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Page from "./components/Page";
import Palette from "./components/Palette";
import PaletteList from "./components/PaletteList";
import SingleColorPalette from "./components/SingleColorPalette";
import NewPaletteForm from "./components/NewPaletteForm";

import seedColors from "./seedColors";

import "./components/styles/Page.css";
import "./App.css";

const App = () => {
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
    <Route
      render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="page" timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path="/palette/new"
                render={(routeProps) => (
                  <Page>
                    <NewPaletteForm
                      {...routeProps}
                      savePalette={savePalette}
                      palettes={palettes}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/:paletteID/:colorID"
                render={(routeProps) => (
                  <Page>
                    <SingleColorPalette
                      colorID={routeProps.match.params.colorID}
                      palette={generatePalette(
                        findPalette(routeProps.match.params.paletteID)
                      )}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/"
                render={(routeProps) => (
                  <Page>
                    <PaletteList
                      palettes={palettes}
                      deletePalette={deletePalette}
                      {...routeProps}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/palette/:id"
                render={(routeProps) => (
                  <Page>
                    <Palette
                      palette={generatePalette(
                        findPalette(routeProps.match.params.id)
                      )}
                    />
                  </Page>
                )}
              />
              {/* default/404 route */}
              <Route
                render={(routeProps) => (
                  <Page>
                    <PaletteList
                      palettes={palettes}
                      deletePalette={deletePalette}
                      {...routeProps}
                    />
                  </Page>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
    />
  );
};

export default App;
