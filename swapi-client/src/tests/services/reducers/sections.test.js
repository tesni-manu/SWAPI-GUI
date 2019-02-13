import sections, {
  sectionActions
} from "../../../code/services/reducers/sections";

describe("Reducers.Sections", () => {
  it("should set state when loading lists", () => {
    expect(
      sections(undefined, { type: sectionActions.list_loading }).listState
    ).toEqual("loading");
  });

  it("should set state when loaded lists correctly", () => {
    const list = {};
    const newState = sections(undefined, {
      type: sectionActions.list_loaded,
      list
    });
    expect(newState.listState).toEqual("ok");
    expect(newState.list).toEqual(list);
  });

  it("should set state when loading errors out", () => {
    const error = "some error";
    const newState = sections(undefined, {
      type: sectionActions.list_loadError,
      error
    });
    expect(newState.listState).toEqual("error");
    expect(newState.error).toEqual(error);
  });

  it("should set state correctly while adding items to stack", () => {
    const item = {};
    const newState = sections(undefined, {
      type: sectionActions.item_add,
      item
    });
    expect(newState.itemState).toEqual("ok");
    expect(newState.itemStack[0]).toEqual(item);
  });

  it("should set state when loading items", () => {
    expect(
      sections(undefined, { type: sectionActions.item_loading }).itemState
    ).toEqual("loading");
  });

  it("should set state when loaded items correctly", () => {
    const item = {};
    const newState = sections(undefined, {
      type: sectionActions.item_loaded,
      item
    });
    expect(newState.itemState).toEqual("ok");
    expect(newState.itemStack[0]).toEqual(item);
  });

  it("should set state when loading errors out", () => {
    const error = "some error";
    const newState = sections(undefined, {
      type: sectionActions.item_loadError,
      error
    });
    expect(newState.itemState).toEqual("error");
    expect(newState.error).toEqual(error);
  });

  it("should set state when removing items", () => {
    const newState = sections(
      { itemStack: [{}, {}, {}] },
      {
        type: sectionActions.item_remove
      }
    );
    expect(newState.itemState).toEqual("ok");
    expect(newState.itemStack.length).toEqual(2);
  });

  it("should set state when clearing items", () => {
    const newState = sections(
      { itemStack: [{}, {}, {}] },
      {
        type: sectionActions.items_clear
      }
    );
    expect(newState.itemState).toEqual("ok");
    expect(newState.itemStack.length).toEqual(0);
  });
});
