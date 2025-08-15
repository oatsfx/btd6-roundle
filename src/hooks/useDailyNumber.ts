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
    let hash = 293210;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
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
