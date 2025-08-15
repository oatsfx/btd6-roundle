import React, { LazyExoticComponent, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import routes from "configs/routes.config";
import { Loader } from "components/Loader";
import { Navigation } from "components/Navigation";
import { Footer } from "components/Footer";

const ViewPort: React.FC<{ Component: LazyExoticComponent<React.FC> }> = ({
  Component,
}) => {
  return (
    <div className="w-full h-full z-10 flex justify-center">
      <div className="w-screen">
        <Navigation />
        <Component />
      </div>
    </div>
  );
};

const AllRoutes: React.FC = () => (
  <Routes>
    {routes.map((route) => (
      <Route
        key={route.key}
        path={route.path}
        element={<ViewPort Component={route.component} />}
      />
    ))}
  </Routes>
);

const PageView: React.FC = () => {
  return (
    <Suspense fallback={<Loader flavorText="Loading page..." />}>
      <AllRoutes />
    </Suspense>
  );
};

export default PageView;
