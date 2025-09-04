import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { IOrder } from "../../store/orderSlice";
import {
    subscribeOrders,
    upsertOrder,
    deleteOrder as fsDeleteOrder,
} from "../../services/firestore";

export interface IOrdersList {
    [idOrder: string]: IOrder;
}

const getInitialOrdersList = () => {
    try {
        const raw = localStorage.getItem("ordersList");
        if (raw) return JSON.parse(raw) as IOrdersList;
    } catch {}
    return {};
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
        replaceOrders: (
            state,
            action: PayloadAction<Record<string, IOrder>>
        ) => {
            return action.payload;
        },
    },
});

export const ordersListReducer = ordersListSlice.reducer;
export const ordersListAction = ordersListSlice.actions;
export const ordersListSelector = (state: RootState) => state.ordersList;

// Listener to Firestore orders collection
export const startOrdersSubscription = () => (dispatch: any) => {
    return subscribeOrders((orders) => {
        dispatch(ordersListAction.replaceOrders(orders));
        try {
            localStorage.setItem("ordersList", JSON.stringify(orders));
        } catch {}
    });
};

// Thunks for write operations
export const saveOrderToRemote = (order: IOrder) => async () => {
    await upsertOrder(order);
};

export const deleteOrderFromRemote = (orderId: string) => async () => {
    await fsDeleteOrder(orderId);
};
