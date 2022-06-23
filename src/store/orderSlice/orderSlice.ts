import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { format } from "date-fns";
import ruLocale from "date-fns/locale/ru";

export interface IItemForm {
    [key: string]: string;
}

export interface IOrder {
    title: {
        "номер заявки:": string;
        "номер автомобиля:": string;
        "ФИО водителя:": string;
    };
    date: string;
    list: {
        [idItemOrder: string]: IItemForm;
    };
}

const getInitialCurrentOrder = () => {
    if (localStorage.getItem("currentOrder")) {
        return JSON.parse(
            localStorage.getItem("currentOrder") as string
        ) as IOrder;
    } else
        return {
            title: {
                "номер заявки:": "",
                "номер автомобиля:": "",
                "ФИО водителя:": "",
            },
            date: format(new Date(), "dd MMMM yyy", { locale: ruLocale }),
            list: {},
        };
};

const orderSlice = createSlice({
    name: "order",
    initialState: getInitialCurrentOrder(),
    reducers: {
        createOrder: (state) => {
            return (state = {
                title: {
                    "номер заявки:": "",
                    "номер автомобиля:": "",
                    "ФИО водителя:": "",
                },
                date: format(new Date(), "dd MMMM yyy", { locale: ruLocale }),
                list: {},
            });
        },
        openOrder: (state, action: PayloadAction<IOrder>) => {
            return (state = action.payload);
        },
        changeTitleOrder: (
            state,
            action: PayloadAction<{ key: string; value: string }>
        ) => {
            return (state = {
                ...state,
                title: {
                    ...state.title,
                    [action.payload.key]: action.payload.value,
                },
            });
        },
        changeOrder: (
            state,
            action: PayloadAction<{ [key: string]: IItemForm }>
        ) => {
            return (state = {
                ...state,
                list: action.payload,
            });
        },
    },
});

export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;
export const orderSelector = (state: RootState) => state.order;
