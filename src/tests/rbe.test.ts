import { originalRounds } from "data/rounds/originalRounds";
import { getRoundRbe } from "types/roundSet";
import { describe, expect, test } from "vitest";

describe("RBE", () => {
  test("R15", () => {
    expect(getRoundRbe(originalRounds.rounds[14])).toBe(151);
  });

  test("R37", () => {
    expect(getRoundRbe(originalRounds.rounds[36])).toBe(1202);
  });

  test("R49", () => {
    expect(getRoundRbe(originalRounds.rounds[48])).toBe(4771);
  });

  test("R75", () => {
    expect(getRoundRbe(originalRounds.rounds[74])).toBe(25402);
  });

  test("R78", () => {
    expect(getRoundRbe(originalRounds.rounds[77])).toBe(26382);
  });

  test("R82", () => {
    expect(getRoundRbe(originalRounds.rounds[81])).toBe(52320);
  });

  test("R91", () => {
    expect(getRoundRbe(originalRounds.rounds[90])).toBe(71160);
  });

  test("R101", () => {
    expect(getRoundRbe(originalRounds.rounds[100])).toBe(20020);
  });

  test("R104", () => {
    expect(getRoundRbe(originalRounds.rounds[103])).toBe(387472);
  });

  test("R119", () => {
    expect(getRoundRbe(originalRounds.rounds[118])).toBe(319020);
  });

  test("R125", () => {
    expect(getRoundRbe(originalRounds.rounds[124])).toBe(939624);
  });

  test("R140", () => {
    expect(getRoundRbe(originalRounds.rounds[139])).toBe(645440);
  });
});
