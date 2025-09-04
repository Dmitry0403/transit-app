import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "antd/dist/antd.css";
import "./styles/styles.css";
import { fetchSignature } from "./store/signatureSlice";
import { startOrdersSubscription } from "./store/ordersListSlice";
import { isFirebaseConfigured } from "./services/firebase";
import { ensureSignedIn } from "./services/auth";

const Main: React.FC = () => {
    // initialize remote data only if Firebase configured
    if (isFirebaseConfigured) {
        ensureSignedIn().then(() => {
            store.dispatch<any>(fetchSignature());
            store.dispatch<any>(startOrdersSubscription());
        });
    }
    return (
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    );
};

const root = createRoot(document.getElementById("root")!);

root.render(<Main />);
