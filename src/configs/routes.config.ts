import React from "react";

const routes = [
  {
    path: "/",
    key: "roundle",
    name: "Roundle",
    component: React.lazy(() => import("pages/Roundle")),
  },
];

export default routes;
