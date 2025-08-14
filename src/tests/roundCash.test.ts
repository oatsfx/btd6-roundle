import { originalRounds } from "data/rounds/originalRounds";
import { getRoundCash, getRoundRbe } from "types/roundSet";
import { describe, expect, test } from "vitest";

describe("Round Cash", () => {
  test("R1", () => {
    expect(getRoundCash(originalRounds.rounds[0])).toBe(121.0);
  });

  test("R37", () => {
    expect(getRoundCash(originalRounds.rounds[36])).toBe(1339.0);
  });

  test("R48", () => {
    expect(getRoundCash(originalRounds.rounds[47])).toBe(2843.0);
  });

  test("R49", () => {
    expect(getRoundCash(originalRounds.rounds[48])).toBe(4758.0);
  });

  test("R50", () => {
    expect(getRoundCash(originalRounds.rounds[49])).toBe(3016.0);
  });

  test("R59", () => {
    expect(getRoundCash(originalRounds.rounds[58])).toBe(2159.0);
  });

  test("R60", () => {
    expect(getRoundCash(originalRounds.rounds[59])).toBe(922.5);
  });

  test("R61", () => {
    expect(getRoundCash(originalRounds.rounds[60])).toBe(1232.0);
  });

  test("R80", () => {
    expect(getRoundCash(originalRounds.rounds[79])).toBe(1400.2);
  });

  test("R84", () => {
    expect(getRoundCash(originalRounds.rounds[83])).toBe(7044.0);
  });

  test("R85", () => {
    expect(getRoundCash(originalRounds.rounds[84])).toBe(2625.4);
  });

  test("R86", () => {
    expect(getRoundCash(originalRounds.rounds[85])).toBe(948.5);
  });

  test("R99", () => {
    expect(getRoundCash(originalRounds.rounds[98])).toBe(2827.9);
  });

  test("R100", () => {
    expect(getRoundCash(originalRounds.rounds[99])).toBe(1534.6);
  });

  test("R101", () => {
    expect(getRoundCash(originalRounds.rounds[100])).toBe(764.0);
  });

  test("R86", () => {
    expect(getRoundCash(originalRounds.rounds[85])).toBe(948.5);
  });

  test("R119", () => {
    expect(getRoundCash(originalRounds.rounds[118])).toBe(2220.9);
  });

  test("R120", () => {
    expect(getRoundCash(originalRounds.rounds[119])).toBe(5252.8);
  });

  test("R121", () => {
    expect(getRoundCash(originalRounds.rounds[120])).toBe(1593.48);
  });

  test("R139", () => {
    // God damn floats in fucking JavaScript
    expect(getRoundCash(originalRounds.rounds[138])).toBeCloseTo(2166.86);
  });

  test("R140", () => {
    expect(getRoundCash(originalRounds.rounds[139])).toBe(773.84);
  });
});
