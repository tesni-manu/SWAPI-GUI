import { toDisplayName } from "../../code/services/utils";

describe("Utils", () => {
  it("toDisplayName() should convert coded names to display names", () => {
    const testCases = [
      ["films", "Films"],
      ["skin_color", "Skin Color"],
      ["cost_in_credits", "Cost in Credits"],
      ["max_atmosphering_speed", "Max Atmosphering Speed"],
      ["speed_of_light", "Speed of Light"],
      ["a_space_odyssey", "A Space Odyssey"],
      ["MGLT", "MGLT"]
    ];
    testCases.forEach(testCase => {
      const [codedName, displayName] = testCase;
      expect(toDisplayName(codedName)).toEqual(displayName);
    });
  });
});
