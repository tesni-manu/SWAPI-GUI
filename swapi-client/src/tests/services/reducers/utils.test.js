import { createActions } from "../../../code/services/reducers/utils";

describe("Utils:", () => {
  it("convertToHasmap should convert given string of arrays to hashmap", () => {
    const input = ["TEST1", "TEST2", "TEST1", "TEST3"];
    const output = createActions("PREFIX", input);
    expect(output.TEST1).toEqual("PREFIX_TEST1");
    expect(output.TEST2).toEqual("PREFIX_TEST2");
    expect(output.TEST3).toEqual("PREFIX_TEST3");
  });
});
