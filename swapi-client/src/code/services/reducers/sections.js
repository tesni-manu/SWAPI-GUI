import { createActions } from "./utils";

const sectionActions = createActions("sections", [
  "list_loading",
  "list_loaded",
  "list_loadError",
  "item_add",
  "item_loading",
  "item_loaded",
  "item_loadError",
  "item_remove",
  "items_clear"
]);

export default (
  state = { listState: undefined, itemState: undefined, itemStack: [] },
  action
) => {
  switch (action.type) {
    case sectionActions.list_loading:
      return { ...state, listState: "loading" };
    case sectionActions.list_loaded:
      return { ...state, listState: "ok", list: action.list };
    case sectionActions.list_loadError:
      return { ...state, listState: "error", error: action.error };
    case sectionActions.item_add:
      return {
        ...state,
        itemState: "ok",
        itemStack: [...state.itemStack, action.item]
      };
    case sectionActions.item_loading:
      return { ...state, itemState: "loading" };
    case sectionActions.item_loaded:
      return {
        ...state,
        itemState: "ok",
        itemStack: [...state.itemStack, action.item]
      };
    case sectionActions.item_loadError:
      return { ...state, itemState: "error", error: action.error };
    case sectionActions.item_remove:
      const newStack =
        state.itemStack.length < 2
          ? []
          : state.itemStack.slice(0, state.itemStack.length - 1);
      return { ...state, itemState: "ok", itemStack: newStack };
    case sectionActions.items_clear:
      return { ...state, itemState: "ok", itemStack: [] };
    default:
      return state;
  }
};

export { sectionActions };
