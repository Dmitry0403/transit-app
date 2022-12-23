import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { format } from "date-fns";
import ruLocale from "date-fns/locale/ru";
import { nanoid } from "nanoid";

export interface IItemForm {
    [key: string]: string;
}

export interface IOrder {
    id: string;
    title: {
        "номер заявки:": string;
        "номер автомобиля:": string;
        "ФИО водителя:": string;
        "аэропорт:": string;
    };
    isTrailer: boolean;
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
            id: nanoid(),
            title: {
                "номер заявки:": "",
                "номер автомобиля:": "",
                "ФИО водителя:": "",
                "аэропорт:": "Шереметьево",
            },
            isTrailer: false,
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
                id: nanoid(),
                title: {
                    "номер заявки:": "",
                    "номер автомобиля:": "",
                    "ФИО водителя:": "",
                    "аэропорт:": "Шереметьево",
                },
                isTrailer: false,
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
        changeCheckBox: (state, action: PayloadAction<boolean>) => {
            return (state = {
                ...state,
                isTrailer: action.payload,
            });
        },
        addedItemOrder: (state, action: PayloadAction<IItemForm>) => {
            const newList = { ...state.list, [nanoid()]: action.payload };
            return (state = {
                ...state,
                list: newList,
            });
        },
        deleteItemOrder: (state, action: PayloadAction<string>) => {
            const newList = { ...state.list };
            delete newList[action.payload];
            return (state = {
                ...state,
                list: newList,
            });
        },
    },
});

export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;
export const orderSelector = (state: RootState) => state.order;
