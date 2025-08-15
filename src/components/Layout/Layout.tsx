import { Footer } from "components/Footer";
import { PageView } from "components/PageView";
import React from "react";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-linear-to-tr from-secondary/25 to-[20rem]">
      <PageView />

      {/* <div className="fixed min-h-screen w-full bg-linear-to-bl from-secondary/25 via-primary/10 via-[25rem] to-[30rem]" /> */}
      <div className="fixed -right-50 -top-70 size-175 bg-radial from-primary/25 via-primary/10 via-40% to-70%" />
      <div className="fixed -right-80 -top-30 size-175 bg-radial from-secondary/20 to-60%" />
      <Footer />
    </div>
  );
};

export default Layout;
