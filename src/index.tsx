import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import "./styles/styles.css";

const Main: React.FC = () => {
    return <App />;
};

const root = createRoot(document.getElementById("root")!);

root.render(<Main />);
