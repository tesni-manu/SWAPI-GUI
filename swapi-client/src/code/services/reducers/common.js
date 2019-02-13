import { createActions } from "./utils";

const commonActions = createActions("common", [
  "gotSchemas",
  "errorGettingSchemas",
  "resetFirstTimeFlag"
]);

export default (state = { isFirstTime: true, schemas: undefined }, action) => {
  switch (action.type) {
    case commonActions.gotSchemas:
      return { ...state, schemas: action.schemas };
    case commonActions.errorGettingSchemas:
      return { ...state, schemas: action.error };
    case commonActions.resetFirstTimeFlag:
      return { ...state, isFirstTime: false };
    default:
      return state;
  }
};

export { commonActions };
