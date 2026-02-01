import routes from "configs/routes.config";
import {
  FaArrowDown,
  FaArrowUp,
  FaCheck,
  FaCross,
  FaInfo,
  FaInfoCircle,
  FaMinus,
  FaTimes,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@heroui/dropdown";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Link,
  Switch,
  Tooltip,
} from "@heroui/react";
import { useState } from "react";
import { bloonImage, convertMsToSecondsFormat } from "util/formatters";
import { originalRounds } from "data/rounds/originalRounds";
import {
  Bloon,
  bloonArray,
  getHealthRamping,
  getRoundBloonCount,
  getRoundCash,
  getRoundDurationMs,
  getRoundRbe,
  getTotalBloonCount,
} from "types/roundSet";
import stopwatchImage from "images/misc/stopwatch.webp";
import cashImage from "images/misc/cash.webp";
import redBloonImage from "images/bloons/Red.webp";
import {
  calculateRoundleResult,
  GameMode,
  getRoundSetFromMode,
  Result,
  SimpleResult,
} from "types/roundle";

type RoundGuessProps = {
  guess: number;
  answer: number;
  mode: GameMode;
};

const RoundGuess = ({ guess, answer, mode }: RoundGuessProps) => {
  const ARROW_SIZE = 12;

  const rounds = getRoundSetFromMode(mode);

  const guessResult = calculateRoundleResult(
    rounds.rounds[guess],
    rounds.rounds[answer],
  );

  const getArrow = (result: Result) => {
    switch (result) {
      case Result.MissHigher:
      case Result.CloseHigher:
        return (
          <FaArrowUp
            size={ARROW_SIZE}
            className="text-success animate-arrow-fade"
          />
        );
      case Result.MissLower:
      case Result.CloseLower:
        return (
          <FaArrowDown
            size={ARROW_SIZE}
            className="text-danger animate-arrow-fade"
          />
        );
      case Result.Correct:
        return <FaCheck size={ARROW_SIZE} className="animate-arrow-fade" />;
      default:
        return <FaCheck size={ARROW_SIZE} className="invisible" />;
    }
  };

  const getBgColor = (result: Result) => {
    switch (result) {
      case Result.CloseHigher:
      case Result.CloseLower:
        return "bg-warning-100";
      case Result.Correct:
        return "bg-success-100";
      default:
        return "bg-default-100";
    }
  };

  const getSimpleResultIcon = (result: SimpleResult) => {
    switch (result) {
      case SimpleResult.Miss:
        return (
          <FaTimes
            size={ARROW_SIZE}
            className="text-danger animate-arrow-fade"
          />
        );
      case SimpleResult.Close:
        return <FaMinus size={ARROW_SIZE} className="animate-arrow-fade" />;
      case SimpleResult.Correct:
        return <FaCheck size={ARROW_SIZE} className="animate-arrow-fade" />;
      default:
        return <FaCheck size={ARROW_SIZE} className="invisible" />;
    }
  };

  const getBgColorSimple = (result: SimpleResult) => {
    switch (result) {
      case SimpleResult.Close:
        return "bg-warning-100";
      case SimpleResult.Correct:
        return "bg-success-100";
      default:
        return "bg-default-100";
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader className="justify-between">
          <h4
            className={"font-bold" + (guess === answer ? " text-success" : "")}
          >
            Round {guess + 1}
          </h4>
          {guess === answer ? (
            <h4 className="font-bold text-success">Answer</h4>
          ) : (
            <></>
          )}
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col items-center justify-center w-full gap-1">
          <div className="w-full px-6 flex flex-col gap-1">
            <div className="flex flex-row items-center justify-center w-full gap-1">
              <div
                className={
                  "flex gap-4 items-center p-2 animate-flip justify-between px-4 rounded " +
                  getBgColor(guessResult.time)
                }
              >
                <div className="flex items-center gap-2">
                  <img className="h-6" src={stopwatchImage} />
                  <span className="font-semibold flex flex-col">
                    <span className="text-xs font-light">Length</span>
                    {convertMsToSecondsFormat(
                      getRoundDurationMs(rounds.rounds[guess]),
                    )}
                  </span>
                </div>
                {getArrow(guessResult.time)}
              </div>

              <div
                className={
                  "flex gap-4 items-center p-2 animate-flip justify-between px-4 rounded " +
                  getBgColor(guessResult.bloonTotal)
                }
              >
                <div className="flex items-center gap-2">
                  <span className="font-semibold flex flex-col">
                    <span className="text-xs font-light">Bloons</span>
                    {getTotalBloonCount(rounds.rounds[guess])}
                  </span>
                </div>
                {getArrow(guessResult.bloonTotal)}
              </div>
            </div>
            <div className="flex flex-row items-center justify-center w-full gap-1">
              <div
                className={
                  "flex gap-4 items-center p-2 animate-flip justify-between px-4 rounded " +
                  getBgColor(guessResult.cash)
                }
              >
                <div className="flex items-center gap-2">
                  <img className="w-6" src={cashImage} />
                  <span className="font-semibold flex flex-col">
                    <span className="text-xs font-light">Cash</span>$
                    {((cashVal) =>
                      cashVal % 1 === 0
                        ? cashVal.toString()
                        : cashVal.toFixed(2))(
                      getRoundCash(rounds.rounds[guess]),
                    )}
                  </span>
                </div>
                {getArrow(guessResult.cash)}
              </div>
              <div
                className={
                  "flex gap-4 items-center p-2 animate-flip justify-between px-4 rounded " +
                  getBgColor(guessResult.rbe)
                }
              >
                <div className="flex items-center gap-2">
                  <img className="w-5" src={redBloonImage} />
                  <span className="font-semibold flex flex-col">
                    <span className="text-xs font-light flex flex-row items-center gap-1">
                      RBE
                      <Tooltip
                        color="default"
                        content="Red Bloon Equivalent (RBE)"
                      >
                        <FaInfoCircle />
                      </Tooltip>
                    </span>
                    {getRoundRbe(rounds.rounds[guess])}
                  </span>
                </div>
                {getArrow(guessResult.rbe)}
              </div>
            </div>
          </div>

          <p className="text-sm">Individual Bloons</p>
          <div className="flex flex-wrap items-center justify-center gap-1">
            {guessResult.bloons.map((bloonResult) => (
              <div
                className={
                  "items-center gap-2 flex animate-flip justify-center p-1 px-2 rounded-sm " +
                  getBgColorSimple(bloonResult.result)
                }
                key={bloonResult.bloon}
              >
                <img
                  className="h-8 object-contain"
                  src={bloonImage[bloonResult.bloon]}
                />
                {getSimpleResultIcon(bloonResult.result)}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
      {guess === answer ? <Divider className="my-4" /> : <></>}
    </>
  );
};

export default RoundGuess;
