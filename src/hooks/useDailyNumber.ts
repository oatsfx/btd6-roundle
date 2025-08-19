import { useState, useEffect } from "react";

type DailyNumberResult = {
  number: number;
  seed: number;
  date: Date;
  nextAnswerIn: number;
  loading: boolean;
};

const useDailyNumber = (maxExclusive = 140): DailyNumberResult => {
  const hashString = (str: string) => {
    let hash = 999;
    str += "G7kP2xVzQ9mTaB4rHsYw";
    for (const char of str) {
      hash = (hash << 5) - hash + char.charCodeAt(0);
      hash |= 0; // Constrain to 32bit integer
    }
    return Math.abs(hash);
  };

  const [state, setState] = useState<DailyNumberResult>({
    number: 0,
    seed: -1,
    date: new Date(),
    nextAnswerIn: 0,
    loading: true,
  });

  useEffect(() => {
    let nextMidnightUTC = 0;

    const fetchTime = async () => {
      try {
        const res = await fetch("https://time.now/api/server-time");
        const data = await res.json(); // returns "dateTime": "2025-08-13T22:35:00"
        const now = new Date(data.utc_iso);

        const year = now.getUTCFullYear();
        const month = now.getUTCMonth();
        const day = now.getUTCDate();

        const dateStr = `${year}-${month + 1}-${day}`;
        const seed = hashString(dateStr);
        const number = seed % maxExclusive;

        nextMidnightUTC = Date.UTC(year, month, day + 1);

        setState({
          number,
          seed,
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
  }, [maxExclusive]);

  return state;
};

export default useDailyNumber;
