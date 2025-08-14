import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col gap-2 p-12 items-center px-24 text-center backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70">
      <p className="text-xs opacity-40">
        This site is not affiliated with Ninja Kiwi Ltd. and does not claim any
        rights to their trademarks. Any and all resources related to Ninja Kiwi
        Ltd. and their products are used for entertainment purposes only.
      </p>
      <p className="text-xs opacity-40">
        By using this site, you subject yourself to having your guesses stored
        locally.
      </p>
      <div className="flex flex-col gap-2 items-center pt-6 opacity-40">
        {/* <p className="text-xs">oatsfx</p> */}
        <a href="https://github.com/oatsfx/roundle" target="_blank">
          <FaGithub />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
