import { configureStore } from "@reduxjs/toolkit";
import { orderReducer } from "./orderSlice";
import { ordersListReducer } from "./ordersListSlice";
import { signatureReducer } from "./signatureSlice";
import thunk from "redux-thunk";

export const store = configureStore({
    reducer: {
        order: orderReducer,
        ordersList: ordersListReducer,
        signature: signatureReducer,
    },
    middleware: (getDefault) => getDefault().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
