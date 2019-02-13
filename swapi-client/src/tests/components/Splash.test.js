import React from "react";
import Splash from "../../code/components/Splash.jsx";
import { render } from "react-testing-library";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../code/services";
import { commonActions } from "../../code/services/reducers/index.js";

describe("Splash", () => {
  it("should try to load the schemas on startup", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Splash />
        </Provider>
      </BrowserRouter>
    );
    expect(getByText("Loading ...")).toBeDefined();
  });

  it("should display error when schema loading errors out", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Splash />
        </Provider>
      </BrowserRouter>
    );
    store.dispatch({
      type: commonActions.errorGettingSchemas,
      error: "some error"
    });
    expect(getByText("some error")).toBeDefined();
  });

  it("should display the Start button after loading schemas", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Splash />
        </Provider>
      </BrowserRouter>
    );
    store.dispatch({
      type: commonActions.gotSchemas,
      schemas: {}
    });
    expect(getByText("Start Now")).toBeDefined();
  });
});
