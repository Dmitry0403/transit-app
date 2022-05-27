import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import { BrowserRouter } from "react-router-dom";
import "./styles/styles.css";

const Main: React.FC = () => {
    return (
        <BrowserRouter>
            <App />;
        </BrowserRouter>
    );
};

const root = createRoot(document.getElementById("root")!);

root.render(<Main />);
