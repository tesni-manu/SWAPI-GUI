import { combineReducers } from "redux";
import common, { commonActions } from "./common";
import sections, { sectionActions } from "./sections";

export default combineReducers({ common, sections });

export { commonActions, sectionActions };
