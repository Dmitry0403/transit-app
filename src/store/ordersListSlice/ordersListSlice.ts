import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { IOrder } from "../../store/orderSlice";

export interface IOrdersList {
    [idOrder: string]: IOrder;
}

const getInitialOrdersList = () => {
    if (localStorage.getItem("ordersList")) {
        return JSON.parse(
            localStorage.getItem("ordersList") as string
        ) as IOrdersList;
    } else return {};
};

const ordersListSlice = createSlice({
    name: "ordersList",
    initialState: getInitialOrdersList(),
    reducers: {
        addedOrderToList: (state, action: PayloadAction<IOrder>) => {
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        },
        deleteOrderFromList: (state, action: PayloadAction<string>) => {
            const newOrdersList = { ...state };
            delete newOrdersList[action.payload];
            return newOrdersList;
        },
    },
});

export const ordersListReducer = ordersListSlice.reducer;
export const ordersListAction = ordersListSlice.actions;
export const ordersListSelector = (state: RootState) => state.ordersList;
