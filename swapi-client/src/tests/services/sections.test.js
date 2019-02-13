import { store } from "../../code/services";
import { sectionActions } from "../../code/services/reducers";
import {
  getListState,
  getList,
  hasNext,
  hasPrevious,
  clearStack,
  push,
  pop,
  getStack,
  getItemState,
  getId,
  getType,
  getImage
} from "../../code/services/sections";

describe("Section services", () => {
  it("list getters should work correctly when lists are loaded", () => {
    store.dispatch({
      type: sectionActions.list_loaded,
      list: {
        count: 10,
        next: "next link",
        previous: null,
        results: [{}, {}]
      }
    });
    expect(getListState()).toEqual("ok");
    expect(getList().length).toEqual(2);
    expect(hasNext()).toEqual(true);
    expect(hasPrevious()).toEqual(false);
    store.dispatch({
      type: sectionActions.list_loaded,
      list: {
        count: 5,
        next: null,
        previous: "previous link",
        results: [{}, {}, {}]
      }
    });
    expect(getListState()).toEqual("ok");
    expect(getList().length).toEqual(3);
    expect(hasNext()).toEqual(false);
    expect(hasPrevious()).toEqual(true);
  });

  it("item services should work correctly", () => {
    expect(getStack().length).toEqual(0);
    store.dispatch({
      type: sectionActions.item_loaded,
      item: {}
    });
    expect(getItemState()).toEqual("ok");
    expect(getStack().length).toEqual(1);
    push({});
    expect(getStack().length).toEqual(2);
    pop();
    expect(getStack().length).toEqual(1);
    clearStack();
    expect(getStack().length).toEqual(0);
    const item = {
      url: "https://swapi.co/api/people/11/"
    };
    expect(getId(item)).toEqual(11);
    expect(getType(item)).toEqual("people");
    expect(getImage(item).split("?")[0]).toEqual(
      `images/${getType(item)}/${getId(item)}`
    );
  });
});
