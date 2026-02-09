import { originalRounds } from "data/rounds/originalRounds";
import {
  Bloon,
  bloonArray,
  getRoundBloonCount,
  getRoundCash,
  getRoundDurationMs,
  getRoundRbe,
  getTotalBloonCount,
  getUniqueBloons,
  Round,
  RoundSet,
} from "./roundSet";
import { time } from "console";
import { calcLength } from "framer-motion";
import { alternateRounds } from "data/rounds/AlternateRounds";

const TIME_FACTOR = 5_000;
//const RBE_FACTOR = 5_000;
const RBE_RANGE_FACTOR = 0.15;
const CASH_FACTOR = 500;
const TOTAL_BLOON_FACTOR = 15;
const INDIV_BLOON_FACTOR = 5;
// const INDIV_MOAB_FACTOR = 2;

export const GAME_MODES: Record<GameMode, number> = {
  Original: 140,
  Alternate: 100,
};
export type GameMode = "Original" | "Alternate";
export const gameModeToHashRecord: Record<GameMode, number> = {
  Original: 999,
  Alternate: 998,
};

export type RoundleResult = {
  time: Result;
  rbe: Result;
  cash: Result;
  bloonTotal: Result;
  bloons: BloonResult[];
};

export enum Result {
  NotPresent,
  MissLower,
  CloseLower,
  Correct,
  CloseHigher,
  MissHigher,
}

export enum SimpleResult {
  Miss,
  Close,
  Correct,
}

export type BloonResult = {
  bloon: Bloon;
  result: SimpleResult;
};

export const getRoundSetFromMode = (mode: GameMode): RoundSet => {
  switch (mode) {
    case "Alternate":
      return alternateRounds;
    default:
      return originalRounds;
  }
};

export const calculateRoundleResult = (
  guess: Round,
  answer: Round,
): RoundleResult => {
  const guessRoundTime = getRoundDurationMs(guess);
  const answerRoundTime = getRoundDurationMs(answer);

  const time = calcDiff(guessRoundTime, answerRoundTime, TIME_FACTOR);

  const guessRoundRbe = getRoundRbe(guess);
  const answerRoundRbe = getRoundRbe(answer);

  const rbe = calcRbeDiff(guessRoundRbe, answerRoundRbe, RBE_RANGE_FACTOR);

  const guessRoundCash = getRoundCash(guess);
  const answerRoundCash = getRoundCash(answer);

  const cash = calcDiff(guessRoundCash, answerRoundCash, CASH_FACTOR);

  const guessRoundBloonTotal = getTotalBloonCount(guess);
  const answerRoundBloonTotal = getTotalBloonCount(answer);

  const bloonTotal = calcDiff(
    guessRoundBloonTotal,
    answerRoundBloonTotal,
    TOTAL_BLOON_FACTOR,
  );

  const bloons: BloonResult[] = getBloonResults(guess, answer);

  return { time, rbe, cash, bloonTotal, bloons };
};

const calcDiff = (guess: number, answer: number, factor: number): Result => {
  let diff = answer - guess;

  let result = Result.NotPresent;
  if (diff === 0) {
    result = Result.Correct;
  } else if (diff < 0 && diff > -factor) {
    result = Result.CloseLower;
  } else if (diff < 0) {
    result = Result.MissLower;
  } else if (diff > 0 && diff < factor) {
    result = Result.CloseHigher;
  } else if (diff > 0) {
    result = Result.MissHigher;
  }

  return result;
};

const calcRbeDiff = (guess: number, answer: number, scalar: number): Result => {
  let diff = answer - guess;
  const factor = Math.ceil(answer * scalar);

  let result = Result.NotPresent;
  if (diff === 0) {
    result = Result.Correct;
  } else if (diff < 0 && diff > -factor) {
    result = Result.CloseLower;
  } else if (diff < 0) {
    result = Result.MissLower;
  } else if (diff > 0 && diff < factor) {
    result = Result.CloseHigher;
  } else if (diff > 0) {
    result = Result.MissHigher;
  }

  return result;
};

const getBloonResults = (guess: Round, answer: Round) => {
  const guessBloons = bloonArray.filter((b) =>
    guess.bloonGroups.some((x) => x.bloon === b),
  );

  const result: BloonResult[] = [];

  for (let i = 0; i < guessBloons.length; i++) {
    const bloon = guessBloons[i];

    if (result.some((x) => x.bloon === bloon)) continue;

    const bloonNeighbors = getBloonNeighbors(bloon);

    const correctNeighbors = getUniqueBloons(answer).filter(
      (x) => bloonNeighbors.includes(x) && getUniqueBloons(guess).includes(x),
    ).length;

    const moreNeighbors = getUniqueBloons(answer).filter(
      (x) => bloonNeighbors.includes(x) && !getUniqueBloons(guess).includes(x),
    ).length;

    for (const n of bloonNeighbors.filter((n) =>
      getUniqueBloons(guess).some((x) => x === n),
    )) {
      if (getUniqueBloons(answer).some((x) => x === n)) {
        result.push({ bloon: n, result: SimpleResult.Correct });
      } else if (
        getUniqueBloons(answer).some((x) => bloonNeighbors.includes(x)) &&
        moreNeighbors + correctNeighbors > correctNeighbors
      ) {
        result.push({ bloon: n, result: SimpleResult.Close });
      } else result.push({ bloon: n, result: SimpleResult.Miss });
    }
  }
  return result;
};

const getIndividualBloonResult = (bloon: Bloon, answer: Round) => {
  const bloonNeighbors = getBloonNeighbors(bloon);

  if (answer.bloonGroups.some((x) => x.bloon === bloon))
    return SimpleResult.Correct;
  else if (answer.bloonGroups.some((x) => bloonNeighbors.includes(x.bloon)))
    return SimpleResult.Close;
  else return SimpleResult.Miss;
};

const getBloonNeighbors = (bloon: Bloon): Bloon[] => {
  switch (bloon) {
    case "Red":
    case "RedCamo":
    case "RedRegrow":
    case "RedRegrowCamo":
      return ["Red", "RedCamo", "RedRegrow", "RedRegrowCamo"];

    case "Blue":
    case "BlueCamo":
    case "BlueRegrow":
    case "BlueRegrowCamo":
      return ["Blue", "BlueCamo", "BlueRegrow", "BlueRegrowCamo"];

    case "Green":
    case "GreenCamo":
    case "GreenRegrow":
    case "GreenRegrowCamo":
      return ["Green", "GreenCamo", "GreenRegrow", "GreenRegrowCamo"];

    case "Yellow":
    case "YellowCamo":
    case "YellowRegrow":
    case "YellowRegrowCamo":
      return ["Yellow", "YellowCamo", "YellowRegrow", "YellowRegrowCamo"];

    case "Pink":
    case "PinkCamo":
    case "PinkRegrow":
    case "PinkRegrowCamo":
      return ["Pink", "PinkCamo", "PinkRegrow", "PinkRegrowCamo"];

    case "Black":
    case "BlackCamo":
    case "BlackRegrow":
    case "BlackRegrowCamo":
      return ["Black", "BlackCamo", "BlackRegrow", "BlackRegrowCamo"];

    case "White":
    case "WhiteCamo":
    case "WhiteRegrow":
    case "WhiteRegrowCamo":
      return ["White", "WhiteCamo", "WhiteRegrow", "WhiteRegrowCamo"];

    case "Purple":
    case "PurpleCamo":
    case "PurpleRegrow":
    case "PurpleRegrowCamo":
      return ["Purple", "PurpleCamo", "PurpleRegrow", "PurpleRegrowCamo"];

    case "Zebra":
    case "ZebraCamo":
    case "ZebraRegrow":
    case "ZebraRegrowCamo":
      return ["Zebra", "ZebraCamo", "ZebraRegrow", "ZebraRegrowCamo"];

    case "Lead":
    case "LeadCamo":
    case "LeadRegrow":
    case "LeadRegrowCamo":
    case "LeadFortified":
    case "LeadFortifiedCamo":
    case "LeadRegrowFortified":
    case "LeadRegrowFortifiedCamo":
      return [
        "Lead",
        "LeadCamo",
        "LeadRegrow",
        "LeadRegrowCamo",
        "LeadFortified",
        "LeadFortifiedCamo",
        "LeadRegrowFortified",
        "LeadRegrowFortifiedCamo",
      ];

    case "Rainbow":
    case "RainbowCamo":
    case "RainbowRegrow":
    case "RainbowRegrowCamo":
      return ["Rainbow", "RainbowCamo", "RainbowRegrow", "RainbowRegrowCamo"];

    case "Ceramic":
    case "CeramicCamo":
    case "CeramicRegrow":
    case "CeramicRegrowCamo":
    case "CeramicFortified":
    case "CeramicFortifiedCamo":
    case "CeramicRegrowFortified":
    case "CeramicRegrowFortifiedCamo":
      return [
        "Ceramic",
        "CeramicCamo",
        "CeramicRegrow",
        "CeramicRegrowCamo",
        "CeramicFortified",
        "CeramicFortifiedCamo",
        "CeramicRegrowFortified",
        "CeramicRegrowFortifiedCamo",
      ];

    case "Moab":
    case "MoabFortified":
      return ["Moab", "MoabFortified"];

    case "Bfb":
    case "BfbFortified":
      return ["Bfb", "BfbFortified"];

    case "Zomg":
    case "ZomgFortified":
      return ["Zomg", "ZomgFortified"];

    case "DdtCamo":
    case "DdtFortifiedCamo":
      return ["DdtCamo", "DdtFortifiedCamo"];

    case "Bad":
    case "BadFortified":
      return ["Bad", "BadFortified"];

    default:
      return [];
  }
};
