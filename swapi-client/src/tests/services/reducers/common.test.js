import common, { commonActions } from "../../../code/services/reducers/common";

describe("Reducers.Common", () => {
  it("should store the given schemas", () => {
    const schemas = { a: 1, b: 2 };
    expect(
      common(undefined, { type: commonActions.gotSchemas, schemas }).schemas
    ).toEqual(schemas);
  });

  it("should store error if schemas could not be retrieved from the server", () => {
    const error = "some error";
    expect(
      common(undefined, { type: commonActions.errorGettingSchemas, error })
        .schemas
    ).toEqual(error);
  });

  it("should reset first time flag", () => {
    expect(
      common(undefined, { type: commonActions.resetFirstTimeFlag }).isFirstTime
    ).toEqual(false);
  });
});
