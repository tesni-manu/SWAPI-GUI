import React from "react";
import ReactDOM from "react-dom";
import App from "../code/App";
import { render } from "react-testing-library";
import { store } from "../code/services";
import { commonActions } from "../code/services/reducers/index.js";

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("should render Splash the first time", () => {
    const { getByText } = render(<App />);
    store.dispatch({
      type: commonActions.gotSchemas,
      schemas: {}
    });
    expect(getByText("Star Wars Universe Explorer!")).toBeDefined();
    expect(getByText("Start Now")).toBeDefined();
  });

  it("should render Main after closing the Splash component", () => {
    const { getByText } = render(<App />);
    store.dispatch({
      type: commonActions.gotSchemas,
      schemas: {}
    });
    expect(getByText("Start Now")).toBeDefined();
    getByText("Start Now").click();
    expect(getByText("Explore the universe, you must!")).toBeDefined();
  });
});
