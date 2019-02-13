import React from "react";
import Main from "../../code/components/Main.jsx";
import { render } from "react-testing-library";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../code/services";

describe("Main", () => {
  it("should display the wikipedia quote the first time", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    );
    expect(getByText("Wikipedia:")).toBeDefined();
  });

  it("wikipedia quote should be hidden after 60 seconds and should not be rendered again", () => {
    jest.useFakeTimers();
    {
      const { queryAllByText } = render(
        <BrowserRouter>
          <Provider store={store}>
            <Main />
          </Provider>
        </BrowserRouter>
      );
      jest.runAllTimers();
      expect(queryAllByText("Wikipedia:").length).toBe(0);
      jest.clearAllTimers();
    }
    {
      const { queryAllByText } = render(
        <BrowserRouter>
          <Provider store={store}>
            <Main />
          </Provider>
        </BrowserRouter>
      );
      expect(queryAllByText("Wikipedia:").length).toBe(0);
    }
  });

  it("should have navigation links to all the sections", () => {
    jest.useFakeTimers();
    const { getByText } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    );
    jest.runAllTimers();
    jest.clearAllTimers();
    expect(getByText("Films").attributes.href.value).toEqual("/films");
    expect(getByText("People").attributes.href.value).toEqual("/people");
    expect(getByText("Species").attributes.href.value).toEqual("/species");
    expect(getByText("Starships").attributes.href.value).toEqual("/starships");
    expect(getByText("Planets").attributes.href.value).toEqual("/planets");
    expect(getByText("Vehicles").attributes.href.value).toEqual("/vehicles");
  });
});
