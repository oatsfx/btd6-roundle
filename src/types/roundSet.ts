export type RoundSet = {
  rounds: Round[];
  scale?: number;
};

export type Round = {
  bloonGroups: BloonGroup[];
  roundNumber: number;
  addToRound: boolean;
};

export type BloonGroup = {
  bloon: Bloon;
  count: number;
  start: number;
  duration: number;
};

export type RoundSetDef = {
  name: string;
  path: string;
  isComplete: boolean;
};

export type Bloon =
  | "Bad"
  | "BadFortified"
  | "Bfb"
  | "BfbFortified"
  | "Black"
  | "BlackCamo"
  | "BlackRegrow"
  | "BlackRegrowCamo"
  | "Blue"
  | "BlueCamo"
  | "BlueRegrow"
  | "BlueRegrowCamo"
  | "Ceramic"
  | "CeramicCamo"
  | "CeramicFortified"
  | "CeramicFortifiedCamo"
  | "CeramicRegrow"
  | "CeramicRegrowCamo"
  | "CeramicRegrowFortified"
  | "CeramicRegrowFortifiedCamo"
  | "DdtCamo"
  | "DdtFortifiedCamo"
  | "Green"
  | "GreenCamo"
  | "GreenRegrow"
  | "GreenRegrowCamo"
  | "Lead"
  | "LeadCamo"
  | "LeadFortified"
  | "LeadFortifiedCamo"
  | "LeadRegrow"
  | "LeadRegrowCamo"
  | "LeadRegrowFortified"
  | "LeadRegrowFortifiedCamo"
  | "Moab"
  | "MoabFortified"
  | "Pink"
  | "PinkCamo"
  | "PinkRegrow"
  | "PinkRegrowCamo"
  | "Purple"
  | "PurpleCamo"
  | "PurpleRegrow"
  | "PurpleRegrowCamo"
  | "Rainbow"
  | "RainbowCamo"
  | "RainbowRegrow"
  | "RainbowRegrowCamo"
  | "Red"
  | "RedCamo"
  | "RedRegrow"
  | "RedRegrowCamo"
  | "White"
  | "WhiteCamo"
  | "WhiteRegrow"
  | "WhiteRegrowCamo"
  | "Yellow"
  | "YellowCamo"
  | "YellowRegrow"
  | "YellowRegrowCamo"
  | "Zebra"
  | "ZebraCamo"
  | "ZebraRegrow"
  | "ZebraRegrowCamo"
  | "Zomg"
  | "ZomgFortified";

export const bloonArray: Bloon[] = [
  "Red",
  "RedCamo",
  "RedRegrow",
  "RedRegrowCamo",
  "Blue",
  "BlueCamo",
  "BlueRegrow",
  "BlueRegrowCamo",
  "Green",
  "GreenCamo",
  "GreenRegrow",
  "GreenRegrowCamo",
  "Yellow",
  "YellowCamo",
  "YellowRegrow",
  "YellowRegrowCamo",
  "Pink",
  "PinkCamo",
  "PinkRegrow",
  "PinkRegrowCamo",
  "Black",
  "BlackCamo",
  "BlackRegrow",
  "BlackRegrowCamo",
  "White",
  "WhiteCamo",
  "WhiteRegrow",
  "WhiteRegrowCamo",
  "Purple",
  "PurpleCamo",
  "PurpleRegrow",
  "PurpleRegrowCamo",
  "Zebra",
  "ZebraCamo",
  "ZebraRegrow",
  "ZebraRegrowCamo",
  "Lead",
  "LeadCamo",
  "LeadFortified",
  "LeadFortifiedCamo",
  "LeadRegrow",
  "LeadRegrowCamo",
  "LeadRegrowFortified",
  "LeadRegrowFortifiedCamo",
  "Rainbow",
  "RainbowCamo",
  "RainbowRegrow",
  "RainbowRegrowCamo",
  "Ceramic",
  "CeramicCamo",
  "CeramicFortified",
  "CeramicFortifiedCamo",
  "CeramicRegrow",
  "CeramicRegrowCamo",
  "CeramicRegrowFortified",
  "CeramicRegrowFortifiedCamo",
  "Moab",
  "MoabFortified",
  "Bfb",
  "BfbFortified",
  "Zomg",
  "ZomgFortified",
  "DdtCamo",
  "DdtFortifiedCamo",
  "Bad",
  "BadFortified",
];

export const getRoundDurationMs = (round: Round): number => {
  const rawDuration = round.bloonGroups.reduce((maxEnd, group) => {
    const endTime = group.start + group.duration;
    return Math.max(maxEnd, endTime);
  }, 0);

  return Math.round(rawDuration * 100) * 10;
};

export const getRoundDurationFrameMs = (round: Round): number => {
  const rawDuration = round.bloonGroups.reduce((maxEnd, group) => {
    const endTime = group.start + group.duration;
    return Math.max(maxEnd, endTime);
  }, 0);

  return (Math.ceil(rawDuration * 60) / 60) * 1000;
};

export const getBloonRbe = (round: Round, bloon: Bloon): number => {
  const isSuper = round.roundNumber > 80;

  switch (bloon) {
    case "Red":
    case "RedCamo":
    case "RedRegrow":
    case "RedRegrowCamo":
      return 1;
    case "Blue":
    case "BlueCamo":
    case "BlueRegrow":
    case "BlueRegrowCamo":
      return 1 + getBloonRbe(round, "Red");
    case "Green":
    case "GreenCamo":
    case "GreenRegrow":
    case "GreenRegrowCamo":
      return 1 + getBloonRbe(round, "Blue");
    case "Yellow":
    case "YellowCamo":
    case "YellowRegrow":
    case "YellowRegrowCamo":
      return 1 + getBloonRbe(round, "Green");
    case "Pink":
    case "PinkCamo":
    case "PinkRegrow":
    case "PinkRegrowCamo":
      return 1 + getBloonRbe(round, "Yellow");
    case "Black":
    case "BlackCamo":
    case "BlackRegrow":
    case "BlackRegrowCamo":
    case "White":
    case "WhiteCamo":
    case "WhiteRegrow":
    case "WhiteRegrowCamo":
    case "Purple":
    case "PurpleCamo":
    case "PurpleRegrow":
    case "PurpleRegrowCamo":
      return 1 + (isSuper ? 1 : 2) * getBloonRbe(round, "Pink");
    case "Zebra":
    case "ZebraCamo":
    case "ZebraRegrow":
    case "ZebraRegrowCamo":
      return (
        1 +
        getBloonRbe(round, "Black") +
        (isSuper ? 0 : 1) * getBloonRbe(round, "White")
      );
    case "Lead":
    case "LeadCamo":
    case "LeadRegrow":
    case "LeadRegrowCamo":
      return 1 + (isSuper ? 1 : 2) * getBloonRbe(round, "Black");
    case "LeadFortified":
    case "LeadFortifiedCamo":
    case "LeadRegrowFortified":
    case "LeadRegrowFortifiedCamo":
      return 4 + (isSuper ? 1 : 2) * getBloonRbe(round, "Black");
    case "Rainbow":
    case "RainbowCamo":
    case "RainbowRegrow":
    case "RainbowRegrowCamo":
      return 1 + (isSuper ? 1 : 2) * getBloonRbe(round, "Zebra");
    case "Ceramic":
    case "CeramicCamo":
    case "CeramicRegrow":
    case "CeramicRegrowCamo":
      return (
        (isSuper ? 60 : 10) + (isSuper ? 1 : 2) * getBloonRbe(round, "Rainbow")
      );
    case "CeramicFortified":
    case "CeramicFortifiedCamo":
    case "CeramicRegrowFortified":
    case "CeramicRegrowFortifiedCamo":
      return (
        (isSuper ? 120 : 20) + (isSuper ? 1 : 2) * getBloonRbe(round, "Rainbow")
      );
    case "Moab":
      return (
        200 * getHealthRamping(round.roundNumber) +
        4 * getBloonRbe(round, "Ceramic")
      );
    case "MoabFortified":
      return (
        400 * getHealthRamping(round.roundNumber) +
        4 * getBloonRbe(round, "CeramicFortified")
      );
    case "Bfb":
      return (
        700 * getHealthRamping(round.roundNumber) +
        4 * getBloonRbe(round, "Moab")
      );
    case "BfbFortified":
      return (
        1400 * getHealthRamping(round.roundNumber) +
        4 * getBloonRbe(round, "MoabFortified")
      );
    case "Zomg":
      return (
        4000 * getHealthRamping(round.roundNumber) +
        4 * getBloonRbe(round, "Bfb")
      );
    case "ZomgFortified":
      return (
        8000 * getHealthRamping(round.roundNumber) +
        4 * getBloonRbe(round, "BfbFortified")
      );
    case "DdtCamo":
      return (
        400 * getHealthRamping(round.roundNumber) +
        4 * getBloonRbe(round, "CeramicRegrowCamo")
      );
    case "DdtFortifiedCamo":
      return (
        800 * getHealthRamping(round.roundNumber) +
        4 * getBloonRbe(round, "CeramicRegrowFortifiedCamo")
      );
    case "Bad":
      return (
        20000 * getHealthRamping(round.roundNumber) +
        2 * getBloonRbe(round, "Zomg") +
        3 * getBloonRbe(round, "DdtCamo")
      );
    case "BadFortified":
      return (
        40000 * getHealthRamping(round.roundNumber) +
        2 * getBloonRbe(round, "ZomgFortified") +
        3 * getBloonRbe(round, "DdtFortifiedCamo")
      );
    default:
      return 0;
  }
};

export const getBloonCash = (round: Round, bloon: Bloon): number => {
  const isSuper = round.roundNumber > 80;
  const cashFactor = getRoundCashFactor(round);

  switch (bloon) {
    case "Red":
    case "RedCamo":
    case "RedRegrow":
    case "RedRegrowCamo":
      return cashFactor;
    case "Blue":
    case "BlueCamo":
    case "BlueRegrow":
    case "BlueRegrowCamo":
      return cashFactor + getBloonCash(round, "Red");
    case "Green":
    case "GreenCamo":
    case "GreenRegrow":
    case "GreenRegrowCamo":
      return cashFactor + getBloonCash(round, "Blue");
    case "Yellow":
    case "YellowCamo":
    case "YellowRegrow":
    case "YellowRegrowCamo":
      return cashFactor + getBloonCash(round, "Green");
    case "Pink":
    case "PinkCamo":
    case "PinkRegrow":
    case "PinkRegrowCamo":
      return cashFactor + getBloonCash(round, "Yellow");
    case "Black":
    case "BlackCamo":
    case "BlackRegrow":
    case "BlackRegrowCamo":
    case "White":
    case "WhiteCamo":
    case "WhiteRegrow":
    case "WhiteRegrowCamo":
    case "Purple":
    case "PurpleCamo":
    case "PurpleRegrow":
    case "PurpleRegrowCamo":
      return cashFactor + (isSuper ? 1 : 2) * getBloonCash(round, "Pink");
    case "Zebra":
    case "ZebraCamo":
    case "ZebraRegrow":
    case "ZebraRegrowCamo":
      return (
        cashFactor +
        getBloonCash(round, "Black") +
        (isSuper ? 0 : 1) * getBloonCash(round, "White")
      );
    case "Lead":
    case "LeadCamo":
    case "LeadRegrow":
    case "LeadRegrowCamo":
    case "LeadFortified":
    case "LeadFortifiedCamo":
    case "LeadRegrowFortified":
    case "LeadRegrowFortifiedCamo":
      return cashFactor + (isSuper ? 1 : 2) * getBloonCash(round, "Black");
    case "Rainbow":
    case "RainbowCamo":
    case "RainbowRegrow":
    case "RainbowRegrowCamo":
      return cashFactor + (isSuper ? 1 : 2) * getBloonCash(round, "Zebra");
    case "Ceramic":
    case "CeramicCamo":
    case "CeramicRegrow":
    case "CeramicRegrowCamo":
    case "CeramicFortified":
    case "CeramicFortifiedCamo":
    case "CeramicRegrowFortified":
    case "CeramicRegrowFortifiedCamo":
      return (
        (isSuper ? 87 * cashFactor : cashFactor) +
        (isSuper ? 1 : 2) * getBloonCash(round, "Rainbow")
      );
    case "Moab":
      return cashFactor + 4 * getBloonCash(round, "Ceramic");
    case "MoabFortified":
      return cashFactor + 4 * getBloonCash(round, "CeramicFortified");
    case "Bfb":
      return cashFactor + 4 * getBloonCash(round, "Moab");
    case "BfbFortified":
      return cashFactor + 4 * getBloonCash(round, "MoabFortified");
    case "Zomg":
      return cashFactor + 4 * getBloonCash(round, "Bfb");
    case "ZomgFortified":
      return cashFactor + 4 * getBloonCash(round, "BfbFortified");
    case "DdtCamo":
      return cashFactor + 4 * getBloonCash(round, "CeramicRegrowCamo");
    case "DdtFortifiedCamo":
      return cashFactor + 4 * getBloonCash(round, "CeramicRegrowFortifiedCamo");
    case "Bad":
      return (
        cashFactor +
        2 * getBloonCash(round, "Zomg") +
        3 * getBloonCash(round, "DdtCamo")
      );
    case "BadFortified":
      return (
        cashFactor +
        2 * getBloonCash(round, "ZomgFortified") +
        3 * getBloonCash(round, "DdtFortifiedCamo")
      );
    default:
      return 0;
  }
};

export const getHealthRamping = (r: number) => {
  let v;
  if (r <= 80) v = 1;
  else if (r <= 100) v = (r - 30) / 50;
  else if (r <= 124) v = (r - 72) / 20;
  else if (r <= 150) v = (3 * r - 320) / 20;
  else if (r <= 250) v = (7 * r - 920) / 20;
  else if (r <= 300) v = r - 208.5;
  else if (r <= 400) v = (3 * r - 717) / 2;
  else if (r <= 500) v = (5 * r - 1517) / 2;
  else v = 5 * r - 2008.5;
  return roundNum(v, 2);
};

const roundNum = (num: number, numDigitsAfterDecimal = 0) => {
  return (
    Math.round(num * 10 ** numDigitsAfterDecimal) / 10 ** numDigitsAfterDecimal
  );
};

export const getRoundRbe = (round: Round) => {
  return round.bloonGroups.reduce(
    (sum, current) => sum + getBloonRbe(round, current.bloon) * current.count,
    0
  );
};

export const getRoundBloonCount = (round: Round, bloon: Bloon) => {
  return round.bloonGroups.reduce(
    (sum, current) => (current.bloon === bloon ? sum + current.count : sum),
    0
  );
};

export const getTotalBloonCount = (round: Round) => {
  return round.bloonGroups.reduce((sum, current) => sum + current.count, 0);
};

export const getRoundCash = (round: Round) => {
  const bloonCash = round.bloonGroups.reduce(
    (sum, current) => sum + getBloonCash(round, current.bloon) * current.count,
    0
  );
  const eor = 100 + round.roundNumber;

  return roundNum(bloonCash, 2) + eor;
};

export const getRoundCashFactor = (round: Round) => {
  const r = round.roundNumber;

  if (r <= 50) {
    return 1;
  } else if (r <= 60) {
    return 0.5;
  } else if (r <= 85) {
    return 0.2;
  } else if (r <= 100) {
    return 0.1;
  } else if (r <= 120) {
    return 0.05;
  } else {
    return 0.02;
  }
};

export const getUniqueBloons = (round: Round) => {
  return bloonArray.filter((x) =>
    round.bloonGroups.some((group) => group.bloon === x)
  );
};
