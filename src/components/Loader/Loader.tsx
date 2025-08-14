import { Spinner } from "@heroui/react";
import React, { useEffect } from "react";

type LoaderProps = {
  flavorText: string;
};

const Loader: React.FC<LoaderProps> = ({ flavorText }: LoaderProps) => {
  const [timeoutMsg, setTimeoutMsg] = React.useState<string>(" ");
  const [timeoutMsgColor, setTimeoutMsgColor] = React.useState<string>(" ");

  useEffect(() => {
    setTimeout(function () {
      setTimeoutMsg("Still loading, please wait...");
    }, 4000);

    setTimeout(function () {
      setTimeoutMsg("You should probably refresh the page.");
      setTimeoutMsgColor(" text-warning");
    }, 9000);
  }, []);

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center text-center">
      <Spinner
        classNames={{ label: "text-foreground mt-4" }}
        size="lg"
        variant="wave"
      />
      <span className="text-center pt-6 text-2xl font-bold">{flavorText}</span>
      <span className={"text-center text-base pt-4 italic" + timeoutMsgColor}>
        {timeoutMsg}
      </span>
    </div>
  );
};

export default Loader;
