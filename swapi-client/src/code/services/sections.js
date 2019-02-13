import { store, get, post } from "./index";
import { sectionActions } from "./reducers";

const stripSwapiBaseUrl = url =>
  url.toLowerCase().split("https://swapi.co/")[1];
const search = (type, str) => {
  store.dispatch({ type: sectionActions.list_loading });
  loadList(`api/${type}/?search=${str}`);
};
const loadList = api => {
  get(api)
    .then(res => {
      store.dispatch({
        type: sectionActions.list_loaded,
        list: res.data
      });
    })
    .catch(err => {
      store.dispatch({
        type: sectionActions.list_loadError,
        error: err.message
      });
    });
};
const getListState = () => store.getState().sections.listState;
const getLoadError = () => store.getState().sections.error;
const getList = () =>
  store.getState().sections.listState === "ok"
    ? store.getState().sections.list.results
    : [];
const hasNext = () =>
  store.getState().sections.listState === "ok"
    ? store.getState().sections.list.next !== null
    : false;
const hasPrevious = () =>
  store.getState().sections.listState === "ok"
    ? store.getState().sections.list.previous !== null
    : false;
const loadNext = () => {
  store.dispatch({ type: sectionActions.list_loading });
  loadList(stripSwapiBaseUrl(store.getState().sections.list.next));
};
const loadPrevious = () => {
  store.dispatch({ type: sectionActions.list_loading });
  loadList(stripSwapiBaseUrl(store.getState().sections.list.previous));
};
const clearSearch = type => search(type, "");
const clearStack = () => store.dispatch({ type: sectionActions.items_clear });
const push = itemOrUrl => {
  if (typeof itemOrUrl === "string") {
    // Url
    store.dispatch({ type: sectionActions.item_loading });
    get(stripSwapiBaseUrl(itemOrUrl))
      .then(res => {
        store.dispatch({
          type: sectionActions.item_loaded,
          item: res.data
        });
      })
      .catch(err => {
        store.dispatch({
          type: sectionActions.item_loadError,
          error: err.message
        });
      });
  } else {
    // Item
    store.dispatch({ type: sectionActions.item_add, item: itemOrUrl });
  }
};
const pop = delay => {
  if (delay) {
    store.dispatch({ type: sectionActions.item_loading });
    setTimeout(() => {
      store.dispatch({ type: sectionActions.item_remove });
    }, delay * 1000);
  } else store.dispatch({ type: sectionActions.item_remove });
};
const getStack = () =>
  store.getState().sections.itemState === "ok"
    ? store.getState().sections.itemStack
    : [];
const getItemState = () => store.getState().sections.itemState;
const getId = item => {
  const temp = item.url.split("/");
  return parseInt(temp[temp.length - 2]);
};
const getType = itemOrUrl => {
  let url;
  if (typeof itemOrUrl === "string") url = itemOrUrl;
  else url = itemOrUrl.url;
  const temp = url.split("/");
  return temp[temp.length - 3];
};
const setImage = (type, id, imageUrl) =>
  post(`images/${type}/${id}`, { imageUrl });
const getImage = item =>
  `images/${getType(item)}/${getId(item)}?random=${new Date()}`;

export {
  search,
  getListState,
  getList,
  hasNext,
  hasPrevious,
  loadNext,
  loadPrevious,
  clearSearch,
  clearStack,
  push,
  pop,
  getStack,
  getItemState,
  getId,
  getType,
  getImage,
  setImage,
  getLoadError
};
