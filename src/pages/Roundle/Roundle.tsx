import React, { useEffect, useState } from "react";
import { originalRounds } from "data/rounds/originalRounds";
import {
  bloonArray,
  getBloonRbe,
  getHealthRamping,
  getRoundDurationMs,
} from "types/roundSet";
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberInput,
  PressEvent,
  useDisclosure,
} from "@heroui/react";
import { bloonImage } from "util/formatters";
import { RoundGuess } from "components/RoundGuess";
import useDailyNumber from "hooks/useDailyNumber";
import { number } from "framer-motion";
import { Loader } from "components/Loader";

const Roundle: React.FC = () => {
  // const [answer, setAnswer] = React.useState<number>(
  //   Math.floor(Math.random() * originalRounds.rounds.length)
  // );
  const {
    number: answer,
    seed,
    date,
    nextAnswerIn,
    loading,
  } = useDailyNumber(140);
  const [guesses, setGuesses] = React.useState<number[]>([]);
  const [disableInput, setDisableInput] = React.useState<boolean>(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const nextMidnight = new Date();
  nextMidnight.setDate(nextMidnight.getDate() + 1);
  nextMidnight.setHours(0, 0, 0, 0);

  const GUESS_COUNT_MAX = 6;

  const guessCount = guesses.length;

  const formatTime = (): string => {
    const totalMs = nextAnswerIn;
    const totalSeconds = Math.floor(totalMs / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (guesses.length >= 6) {
      return;
    }

    const data = Object.fromEntries(new FormData(e.currentTarget));
    const guess = Number.parseInt(`${data.submittedRound}`);

    if (!guess) return;

    const zeroedIndexGuess = guess - 1;

    if (guesses.includes(zeroedIndexGuess)) return;

    const newGuesses = [zeroedIndexGuess, ...guesses];
    setGuesses(newGuesses);
    localStorage.setItem("roundleGuesses", JSON.stringify(newGuesses));
    localStorage.setItem("roundleId", JSON.stringify(seed));

    if (newGuesses.length >= 6) {
      onOpen();
      setDisableInput(true);
    }

    if (newGuesses.includes(answer)) {
      onOpen();
      setDisableInput(true);
    }

    e.currentTarget.reset(); // clears all inputs in the form
  };

  const buildResult = () => {
    let result = `BTD6 roundle ${
      date.getUTCMonth() + 1
    }/${date.getUTCDate()}/${date.getUTCFullYear()}\n`;

    const reversed = [...guesses].reverse();

    for (let g of reversed) {
      result += g === answer ? "✅" : g > answer ? "⬇️" : "⬆️";
      //result += g === answer ? "✅" : "❌";
    }

    //⬆️⬇️

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

  useEffect(() => {
    if (seed <= 0) return; // wait until seed is loaded

    const item = localStorage.getItem("roundleGuesses");
    let newGuesses: number[] = [];
    if (!item) return;
    const localId = number.parse(localStorage.getItem("roundleId") ?? "0");
    if (number.parse(localStorage.getItem("roundleId") ?? "0") !== seed) return;

    try {
      const parsed = JSON.parse(item);
      if (!Array.isArray(parsed)) return;

      // Ensure all elements are numbers
      newGuesses = parsed.map(Number).filter((n) => !isNaN(n));
    } catch {
      return;
    }

    setGuesses(newGuesses);
  }, [seed]);

  if (loading) {
    return <Loader flavorText="Loading game..." />;
  }

  return (
    <div className="flex flex-col w-full items-center mt-10">
      {guessCount >= GUESS_COUNT_MAX || guesses.includes(answer) ? (
        <Button onPress={onOpen}>Show Results</Button>
      ) : (
        <Form
          className="w-full max-w-xs flex items-center"
          onSubmit={handleSubmit}
        >
          <NumberInput
            isClearable
            className="max-w-xs"
            placeholder="Enter a round"
            name="submittedRound"
            variant="bordered"
            minValue={1}
            maxValue={originalRounds.rounds.length}
            aria-label="Round Guess Input"
            disabled={disableInput}
          />
          <Button color="primary" type="submit" variant="solid">
            Submit
          </Button>
        </Form>
      )}
      <p className="p-2">
        Guesses: {guessCount}/{GUESS_COUNT_MAX}
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
        {guesses.length >= 6 && !guesses.includes(answer) ? (
          <>
            <RoundGuess guess={answer} answer={answer} />
          </>
        ) : (
          <></>
        )}
        {guesses.map((x) => (
          <RoundGuess guess={x} answer={answer} key={x} />
        ))}
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose: ((e: PressEvent) => void) | undefined) => (
            <>
              <ModalHeader className="flex flex-col gap-1" />
              <ModalBody>
                {guesses.includes(answer) ? (
                  <>
                    <p className="text-success text-lg font-bold">
                      You won! - {date.getUTCMonth() + 1}/{date.getUTCDate()}/
                      {date.getUTCFullYear()}
                    </p>
                    <p>
                      You found out that today's BTD6 round was R{answer + 1}.
                      Check back tomorrow for a new game.
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
                <RoundGuess guess={answer} answer={answer} />
                <div className="flex flex-col items-center gap-1">
                  <p>Next game available in:</p>
                  <p className="font-semibold text-xl">{formatTime()}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <p className="text-xs italic opacity-10">{seed}</p>
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
