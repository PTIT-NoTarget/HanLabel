import { Routes, Route } from "react-router-dom";
import Headers from "./Header";

import { routes } from "./Routes";
import ToastMessage from "../../../utils/ToastMessage";

export default function AppLayout() {
  return (
    <div>
      <Headers />
      <Routes>
        {routes.map(({ component: Component, path }) => {
          return <Route key={path} element={<Component />} path={path} />;
        })}
      </Routes>
      <ToastMessage />
    </div>
  );
}
