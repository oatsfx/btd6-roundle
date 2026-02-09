import React, { useEffect, useState } from "react";
import { originalRounds } from "data/rounds/originalRounds";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Form,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberInput,
  PressEvent,
  Tab,
  Tabs,
  useDisclosure,
} from "@heroui/react";
import { RoundGuess } from "components/RoundGuess";
import useDailyNumber from "hooks/useDailyNumber";
import { number } from "framer-motion";
import { Loader } from "components/Loader";
import { GAME_MODES, GameMode } from "types/roundle";

const Roundle: React.FC = () => {
  // const [answer, setAnswer] = React.useState<number>(
  //   Math.floor(Math.random() * originalRounds.rounds.length)
  // );
  const [guesses, setGuesses] = React.useState<Record<GameMode, number[]>>({
    Original: [],
    Alternate: [],
  });
  const [disableInput, setDisableInput] = React.useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [mode, setMode] = useState<GameMode>("Original");
  const { answers, seeds, date, nextAnswerIn, loading } = useDailyNumber();

  const GUESS_COUNT_MAX: Record<GameMode, number> = {
    Original: 6,
    Alternate: 8,
  };

  const guessCount = guesses[mode].length;

  const formatTime = (): string => {
    const totalMs = nextAnswerIn;
    const totalSeconds = Math.floor(totalMs / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0",
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (guesses[mode].length >= GUESS_COUNT_MAX[mode]) {
      return;
    }

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const guess = Number.parseInt(`${data.submittedRound}`);

    if (!guess) return;

    const zeroedIndexGuess = guess - 1;

    if (guesses[mode].includes(zeroedIndexGuess)) return;

    // add new guess for the current mode
    const newGuesses = {
      ...guesses,
      [mode]: [zeroedIndexGuess, ...guesses[mode]],
    };

    setGuesses(newGuesses);
    localStorage.setItem("roundleGuesses", JSON.stringify(newGuesses));
    localStorage.setItem("roundleId", JSON.stringify(seeds));

    if (
      newGuesses[mode].length >= GUESS_COUNT_MAX[mode] ||
      newGuesses[mode].includes(answers[mode])
    ) {
      onOpen();
      setDisableInput(true);
    }

    e.currentTarget.reset(); // clears all inputs in the form
  };

  const buildResult = () => {
    let result = `BTD6 roundle${mode === "Alternate" ? " (ABR)" : ""} ${
      date.getUTCMonth() + 1
    }/${date.getUTCDate()}/${date.getUTCFullYear()}\n`;

    const reversed = [...guesses[mode]].reverse();

    for (let g of reversed) {
      //result += g === answer ? "✅" : g > answer ? "⬇️" : "⬆️";
      result += g === answers[mode] ? "✅" : "❌";
    }

    result += "\n\nPlay at: https://roundle.oatsfx.com";

    return result;
  };

  const copyResult = async () => {
    try {
      const text = await navigator.clipboard.writeText(buildResult());
      console.log("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleModeChange = (s: string) => {
    const newMode = s as GameMode;
    if (
      !(
        guesses[newMode].length >= GUESS_COUNT_MAX[mode] ||
        guesses[newMode].includes(answers[mode])
      )
    ) {
      setDisableInput(false);
    }
    setMode(newMode);
  };

  useEffect(() => {
    if (Object.values(seeds).length <= 0) return; // wait until seed is loaded
    if (seeds[mode] <= 0) return; // wait until seed is loaded

    console.log("a");

    const item = localStorage.getItem("roundleGuesses");
    if (!item) return;
    console.log("a");

    const localId = localStorage.getItem("roundleId");
    if (!localId) return;
    const parsedId = JSON.parse(localId);
    if (parsedId[mode] !== seeds[mode]) return;
    console.log("a");

    try {
      const parsed = JSON.parse(item);
      if (typeof parsed !== "object" || parsed === null) return;

      const newGuesses: Record<GameMode, number[]> = {} as Record<
        GameMode,
        number[]
      >;

      Object.keys(GAME_MODES).forEach((mode) => {
        const gameMode = mode as GameMode;
        newGuesses[gameMode] = Array.isArray(parsed[gameMode])
          ? parsed[gameMode].map(Number).filter((n) => !isNaN(n))
          : [];
      });

      setGuesses(newGuesses);
    } catch {
      return;
    }
  }, [seeds[mode]]);

  if (loading) {
    return <Loader flavorText="Loading game..." />;
  }

  return (
    <div className="flex flex-col w-full items-center mt-10">
      <div className="flex flex-col py-2">
        <Tabs
          aria-label="Game Mode Tabs"
          color="primary"
          items={Object.keys(GAME_MODES).map((mode) => ({
            id: mode,
            label: mode,
            content: mode,
          }))}
          selectedKey={mode}
          onSelectionChange={(key) => handleModeChange(key as GameMode)}
        >
          {(item) => (
            <Tab
              key={item.id}
              title={
                <div className="flex items-center space-x-2">
                  <span>{item.label}</span>
                </div>
              }
            />
          )}
        </Tabs>
      </div>
      {guessCount >= GUESS_COUNT_MAX[mode] ||
      guesses[mode].includes(answers[mode]) ? (
        <Button onPress={onOpen}>Show Results</Button>
      ) : (
        <Form
          className="w-full max-w-xs flex items-center"
          onSubmit={handleSubmit}
        >
          <NumberInput
            isClearable
            className="max-w-xs"
            placeholder={"Enter a round between 1 and " + GAME_MODES[mode]}
            name="submittedRound"
            variant="bordered"
            minValue={1}
            maxValue={GAME_MODES[mode]}
            aria-label="Round Guess Input"
            disabled={disableInput}
          />
          <Button color="primary" type="submit" variant="solid">
            Submit
          </Button>
        </Form>
      )}
      <p className="p-2">
        Guesses: {guessCount}/{GUESS_COUNT_MAX[mode]}
      </p>
      {/* <div className="flex flex-wrap items-center justify-center gap-1">
        {bloonArray.map((x) => (
          <div className="w-1/5 flex justify-center p-1 bg-default-50 rounded-sm">
            <img className="h-8 object-contain" src={bloonImage[x]} />
            <p>
              {getBloonRbe(originalRounds.rounds[answer], x)}-
              {getHealthRamping(answer)}
            </p>
          </div>
        ))}
      </div> */}
      {/* {originalRounds.rounds.map((x, i) => (
        <RoundGuess guess={x.roundNumber - 1} answer={answer} key={i} />
      ))} */}

      <div className="flex max-w-100 px-4 flex-col gap-2">
        {guesses[mode].length >= GUESS_COUNT_MAX[mode] &&
        !guesses[mode].includes(answers[mode]) ? (
          <>
            <RoundGuess
              guess={answers[mode]}
              answer={answers[mode]}
              mode={mode}
            />
          </>
        ) : (
          <></>
        )}
        {guesses[mode].map((x) => (
          <RoundGuess guess={x} answer={answers[mode]} key={x} mode={mode} />
        ))}
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: ((e: PressEvent) => void) | undefined) => (
            <>
              <ModalHeader className="flex flex-col gap-1" />
              <ModalBody>
                {guesses[mode].includes(answers[mode]) ? (
                  <>
                    <p className="text-success text-lg font-bold">
                      You won! - {date.getUTCMonth() + 1}/{date.getUTCDate()}/
                      {date.getUTCFullYear()}
                    </p>
                    <p>
                      You found out that today's BTD6 round was R
                      {answers[mode] + 1}. Check back tomorrow for a new game.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-danger text-lg font-bold">
                      You lost! - {date.getUTCMonth() + 1}/{date.getUTCDate()}/
                      {date.getUTCFullYear()}
                    </p>
                    <p>Unlucky. Better luck next time.</p>
                  </>
                )}
                <RoundGuess
                  guess={answers[mode]}
                  answer={answers[mode]}
                  mode={mode}
                />
                <div className="flex flex-col items-center gap-1">
                  <p>Next game available in:</p>
                  <p className="font-semibold text-xl">{formatTime()}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <p className="text-xs italic opacity-10">{seeds[mode]}</p>
                <Button onPress={copyResult}>Copy Result</Button>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Roundle;
