import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { IOrder } from "../../common/helper";

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
        changeOrdersList: (
            state,
            action: PayloadAction<{ [idOrder: string]: IOrder }>
        ) => {
            return (state = action.payload);
        },
    },
});

export const ordersListReducer = ordersListSlice.reducer;
export const ordersListAction = ordersListSlice.actions;
export const ordersListSelector = (state: RootState) => state.ordersList;
