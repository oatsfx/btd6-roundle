import { useState, useEffect } from "react";
import { GameMode, GAME_MODES, gameModeToHashRecord } from "types/roundle";

type DailyNumberResult = {
  answers: Record<GameMode, number>;
  seeds: Record<GameMode, number>;
  date: Date;
  nextAnswerIn: number;
  loading: boolean;
};

const useDailyNumber = (): DailyNumberResult => {
  const hashString = (date: Date, mode: GameMode) => {
    let hash = gameModeToHashRecord[mode];
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    const dayOfYear = Math.floor(
      (Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) -
        Date.UTC(date.getUTCFullYear(), 0, 0)) /
        86400000,
    );

    let str = `${dayOfYear / hash}-${year}-${month + 1}-${day}`;
    str += "G7kP2xVzQ9mTaB4rHsYw";
    str += btoa(str);
    for (const char of str) {
      hash = (hash << 5) - hash + char.charCodeAt(0);
      hash |= 0; // constrain to 32-bit
    }
    // console.log(
    //   Math.abs(hash) % maxExclusive,
    //   dayOfYear,
    //   str,
    //   date.toISOString()
    // );

    return Math.abs(hash);
  };

  const [state, setState] = useState<DailyNumberResult>({
    answers: Object.values(GAME_MODES).reduce(
      (acc, mode) => ({ ...acc, [mode]: 0 }),
      {} as Record<GameMode, number>,
    ),
    seeds: Object.values(GAME_MODES).reduce(
      (acc, mode) => ({ ...acc, [mode]: 0 }),
      {} as Record<GameMode, number>,
    ),
    date: new Date(),
    nextAnswerIn: 0,
    loading: true,
  });

  useEffect(() => {
    let nextMidnightUTC = 0;

    const fetchTime = async () => {
      try {
        const res = await fetch("https://time.now/api/server-time", {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json(); // returns "dateTime": "2025-08-13T22:35:00"
        //console.log(data);
        const now = new Date(data.utc_iso);

        // const scalar = 20;
        // const counts: Record<number, number> = {};

        // const sequence: number[] = [];

        // for (let i = 1 - scalar; i < 365 - scalar; i++) {
        //   const tomorrow = new Date(data.utc_iso);
        //   tomorrow.setDate(tomorrow.getDate() + i);

        //   const seed = hashString(tomorrow);
        //   const number = seed % maxExclusive;

        //   // track counts
        //   counts[number] = (counts[number] ?? 0) + 1;
        //   sequence.push(number);
        // }

        // const result = Object.entries(counts)
        //   .sort((a, b) => Number(a[0]) - Number(b[0]))
        //   .map(([num, count]) => `${num}: ${count} ${count > 1 ? "*" : ""}`)
        //   .join("\n");

        // console.log(result);

        // // function to find repeated subsequences of length n
        // function findRepeats(seq: number[], n: number) {
        //   const seen = new Map<string, number[]>();
        //   const repeats: Record<string, number[]> = {};

        //   for (let i = 0; i <= seq.length - n; i++) {
        //     const window = seq.slice(i, i + n);
        //     const key = window.join(",");
        //     if (!seen.has(key)) {
        //       seen.set(key, [i]);
        //     } else {
        //       seen.get(key)!.push(i);
        //       repeats[key] = seen.get(key)!;
        //     }
        //   }
        //   return repeats;
        // }

        // // example: check for repeats of length 3
        // const repeats = findRepeats(sequence, 2);

        // console.log("Repeating subsequences of length 3:");
        // for (const [subseq, positions] of Object.entries(repeats)) {
        //   console.log(`${subseq} at positions ${positions.join(", ")}`);
        // }

        const year = now.getUTCFullYear();
        const month = now.getUTCMonth();
        const day = now.getUTCDate();

        const seeds: Record<GameMode, number> = {} as Record<GameMode, number>;

        const answers: Record<GameMode, number> = {} as Record<
          GameMode,
          number
        >;
        Object.keys(GAME_MODES).forEach((mode) => {
          const gameMode = mode as GameMode;
          seeds[gameMode] = hashString(now, gameMode);
          answers[gameMode] = seeds[gameMode] % GAME_MODES[gameMode];
        });

        nextMidnightUTC = Date.UTC(year, month, day + 1);

        setState({
          answers,
          seeds,
          date: now,
          nextAnswerIn: nextMidnightUTC - now.getTime(),
          loading: false,
        });
      } catch (e) {
        console.error("Failed to fetch server time", e);
      }
    };

    fetchTime();

    const interval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        nextAnswerIn: Math.max(0, nextMidnightUTC - Date.now()),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return state;
};

export default useDailyNumber;
