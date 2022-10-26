import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App/App";
import { DragItemProvider } from "./hooks/useDragItem/useDragItem";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <DragItemProvider>
      <App />
    </DragItemProvider>
  </React.StrictMode>
);
