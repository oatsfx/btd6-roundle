import { originalRounds } from "data/rounds/originalRounds";
import { getRoundRbe } from "types/roundSet";
import { describe, expect, test } from "vitest";
import { calculateRoundleResult, Result, SimpleResult } from "types/roundle";

describe("Roundle Guesses", () => {
  test("Guess - R87 : Answer - R131", () => {
    const result = calculateRoundleResult(
      originalRounds.rounds[86],
      originalRounds.rounds[130]
    );
    expect(result).toEqual({
      time: Result.MissHigher,
      rbe: Result.MissHigher,
      cash: Result.CloseLower,
      bloonTotal: Result.CloseHigher,
      bloons: [{ bloon: "Zomg", result: SimpleResult.Close }],
    });
  });

  test("Guess - R39 : Answer - R49", () => {
    const result = calculateRoundleResult(
      originalRounds.rounds[38],
      originalRounds.rounds[48]
    );
    expect(result).toEqual({
      time: Result.MissHigher,
      rbe: Result.CloseHigher,
      cash: Result.MissHigher,
      bloonTotal: Result.MissHigher,
      bloons: [
        { bloon: "Black", result: SimpleResult.Miss },
        { bloon: "White", result: SimpleResult.Miss },
        { bloon: "Zebra", result: SimpleResult.Correct },
        { bloon: "Rainbow", result: SimpleResult.Correct },
        { bloon: "RainbowRegrow", result: SimpleResult.Correct },
      ],
    });
  });

  test("Guess - R48 : Answer - R49", () => {
    const result = calculateRoundleResult(
      originalRounds.rounds[47],
      originalRounds.rounds[48]
    );
    expect(result).toEqual({
      time: Result.MissLower,
      rbe: Result.CloseHigher,
      cash: Result.MissHigher,
      bloonTotal: Result.MissHigher,
      bloons: [
        { bloon: "PinkRegrow", result: SimpleResult.Miss },
        { bloon: "PurpleRegrowCamo", result: SimpleResult.Miss },
        { bloon: "Rainbow", result: SimpleResult.Correct },
        { bloon: "CeramicFortified", result: SimpleResult.Close },
      ],
    });
  });

  test("Guess - R66 : Answer - R40", () => {
    const result = calculateRoundleResult(
      originalRounds.rounds[65],
      originalRounds.rounds[39]
    );
    expect(result).toEqual({
      time: Result.MissLower,
      rbe: Result.MissLower,
      cash: Result.CloseLower,
      bloonTotal: Result.CloseLower,
      bloons: [
        { bloon: "Moab", result: SimpleResult.Correct },
        { bloon: "MoabFortified", result: SimpleResult.Miss },
      ],
    });
  });

  test("Guess - R69 : Answer - R63", () => {
    const result = calculateRoundleResult(
      originalRounds.rounds[68],
      originalRounds.rounds[62]
    );
    expect(result).toEqual({
      time: Result.CloseHigher,
      rbe: Result.MissHigher,
      cash: Result.MissHigher,
      bloonTotal: Result.MissHigher,
      bloons: [
        { bloon: "BlackRegrow", result: SimpleResult.Miss },
        { bloon: "LeadFortified", result: SimpleResult.Close },
        { bloon: "Ceramic", result: SimpleResult.Correct },
      ],
    });
  });

  test("Guess - R83 : Answer - R67", () => {
    const result = calculateRoundleResult(
      originalRounds.rounds[82],
      originalRounds.rounds[66]
    );
    expect(result).toEqual({
      time: Result.MissLower,
      rbe: Result.MissLower,
      cash: Result.MissLower,
      bloonTotal: Result.MissLower,
      bloons: [
        { bloon: "Ceramic", result: SimpleResult.Close },
        { bloon: "CeramicRegrow", result: SimpleResult.Close },
        { bloon: "CeramicFortified", result: SimpleResult.Close },
        { bloon: "Moab", result: SimpleResult.Correct },
      ],
    });
  });

  test("Guess - R79 : Answer - R82", () => {
    const result = calculateRoundleResult(
      originalRounds.rounds[78],
      originalRounds.rounds[81]
    );
    expect(result).toEqual({
      time: Result.MissLower,
      rbe: Result.MissHigher,
      cash: Result.MissLower,
      bloonTotal: Result.MissLower,
      bloons: [
        { bloon: "RainbowRegrow", result: SimpleResult.Miss },
        { bloon: "Bfb", result: SimpleResult.Correct },
        { bloon: "BfbFortified", result: SimpleResult.Correct },
      ],
    });
  });

  test("Guess - R78 : Answer - R63", () => {
    const result = calculateRoundleResult(
      originalRounds.rounds[77],
      originalRounds.rounds[62]
    );
    expect(result).toEqual({
      time: Result.MissLower,
      rbe: Result.MissLower,
      cash: Result.MissLower,
      bloonTotal: Result.MissLower,
      bloons: [
        { bloon: "Purple", result: SimpleResult.Miss },
        { bloon: "Rainbow", result: SimpleResult.Miss },
        { bloon: "Ceramic", result: SimpleResult.Correct },
        { bloon: "CeramicCamo", result: SimpleResult.Miss },
        { bloon: "Bfb", result: SimpleResult.Miss },
      ],
    });
  });

  test("Guess - R78 : Answer - R51", () => {
    const result = calculateRoundleResult(
      originalRounds.rounds[77],
      originalRounds.rounds[50]
    );
    expect(result).toEqual({
      time: Result.MissLower,
      rbe: Result.MissLower,
      cash: Result.MissLower,
      bloonTotal: Result.MissLower,
      bloons: [
        { bloon: "Purple", result: SimpleResult.Miss },
        { bloon: "Rainbow", result: SimpleResult.Close },
        { bloon: "Ceramic", result: SimpleResult.Miss },
        { bloon: "CeramicCamo", result: SimpleResult.Correct },
        { bloon: "Bfb", result: SimpleResult.Miss },
      ],
    });
  });

  test("Guess - R37 : Answer - R35", () => {
    const result = calculateRoundleResult(
      originalRounds.rounds[36],
      originalRounds.rounds[34]
    );
    expect(result).toEqual({
      time: Result.MissLower,
      rbe: Result.CloseLower,
      cash: Result.CloseLower,
      bloonTotal: Result.CloseHigher,
      bloons: [
        { bloon: "Black", result: SimpleResult.Correct },
        { bloon: "White", result: SimpleResult.Correct },
        { bloon: "WhiteCamo", result: SimpleResult.Miss },
        { bloon: "Zebra", result: SimpleResult.Miss },
        { bloon: "Lead", result: SimpleResult.Miss },
      ],
    });
  });

  test("Guess - R74 : Answer - R83", () => {
    const result = calculateRoundleResult(
      originalRounds.rounds[73],
      originalRounds.rounds[82]
    );
    expect(result).toEqual({
      time: Result.MissLower,
      rbe: Result.MissHigher,
      cash: Result.MissHigher,
      bloonTotal: Result.CloseHigher,
      bloons: [
        { bloon: "Ceramic", result: SimpleResult.Correct },
        { bloon: "CeramicFortified", result: SimpleResult.Correct },
        { bloon: "CeramicRegrowFortifiedCamo", result: SimpleResult.Close },
        { bloon: "Bfb", result: SimpleResult.Miss },
      ],
    });
  });
});
