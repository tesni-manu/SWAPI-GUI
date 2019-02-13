import {
  isSchemaLoaded,
  getSchema,
  getSchemaError,
  isFirstTime,
  resetFirstTimeFlag
} from "../../code/services/common";
import App from "../../code/App.jsx";
import React from "react";
import { render } from "react-testing-library";
import { store } from "../../code/services";
import { commonActions } from "../../code/services/reducers/common";

describe("Common services", () => {
  it("isSchemaLoaded() should return correct value", () => {
    expect(isSchemaLoaded()).toBe(false);
    store.dispatch({ type: commonActions.gotSchemas, schemas: {} });
    expect(isSchemaLoaded()).toBe(true);
  });

  it("getSchema() should return the stored schema", () => {
    store.dispatch({
      type: commonActions.gotSchemas,
      schemas: { films: "abcd" }
    });
    expect(isSchemaLoaded()).toBe(true);
    expect(getSchema("films")).toEqual("abcd");
    expect(getSchemaError()).toBe(undefined);
  });

  it("getSchemaError() should return error when there is one", () => {
    store.dispatch({
      type: commonActions.errorGettingSchemas,
      error: "some error"
    });
    expect(isSchemaLoaded()).toBe(true);
    expect(getSchema("films")).toBe(undefined);
    expect(getSchemaError()).toEqual("some error");
  });

  it("isFirstTime() should return true by default", () => {
    render(<App />);
    expect(isFirstTime()).toBe(true);
  });

  it("resetFirstTimeFlag() should reset the first time flag", () => {
    render(<App />);
    resetFirstTimeFlag();
    expect(isFirstTime()).toBe(false);
  });
});
