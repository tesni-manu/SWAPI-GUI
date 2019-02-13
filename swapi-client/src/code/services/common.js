import store from "./store";
import axios from "axios";
import { commonActions } from "./reducers/common";

// Http calls
const apiURL = api => `/${api}`;
const get = (api, params, options, handlers) =>
  axios.get(apiURL(api), params, options, handlers);
const post = (api, params, options, handlers) =>
  axios.post(apiURL(api), params, options, handlers);

// Load schemas
get("schemas")
  .then(res => {
    store.dispatch({
      type: commonActions.gotSchemas,
      schemas: res.data
    });
  })
  .catch(err => {
    store.dispatch({
      type: commonActions.errorGettingSchemas,
      error: err.message
    });
  });

const isSchemaLoaded = () => store.getState().common.schemas !== undefined;
const getSchema = type =>
  isSchemaLoaded() && typeof store.getState().common.schemas !== "string"
    ? store.getState().common.schemas[type]
    : undefined;
const getSchemaError = () =>
  isSchemaLoaded() && typeof store.getState().common.schemas === "string"
    ? store.getState().common.schemas
    : undefined;

const isFirstTime = () => store.getState().common.isFirstTime;
const resetFirstTimeFlag = () => {
  store.dispatch({ type: commonActions.resetFirstTimeFlag });
};

const getSchemaDescription = type =>
  store.getState().common.schemas[type].description;

const getSchemaProperties = type => ({
  required: store.getState().common.schemas[type].required,
  properties: store.getState().common.schemas[type].properties
});

export {
  get,
  post,
  isSchemaLoaded,
  getSchema,
  getSchemaError,
  isFirstTime,
  resetFirstTimeFlag,
  getSchemaDescription,
  getSchemaProperties
};
