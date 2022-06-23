import { configureStore } from "@reduxjs/toolkit";
import { orderReducer } from "./orderSlice";
import { ordersListReducer } from "./ordersListSlice";

export const store = configureStore({
    reducer: {
        order: orderReducer,
        ordersList: ordersListReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
