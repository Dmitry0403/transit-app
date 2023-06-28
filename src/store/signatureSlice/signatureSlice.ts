import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ISignature {
    position: string;
    fullName: string;
}

const getInitialSignature = () => {
    if (localStorage.getItem("signature")) {
        return JSON.parse(
            localStorage.getItem("signature") as string
        ) as ISignature;
    } else
        return {
            position: "менеджер",
            fullName: "Косенко Дмитрий",
        };
};

const signatureSlice = createSlice({
    name: "signature",
    initialState: getInitialSignature(),
    reducers: {
        changeSignature: (state, action: PayloadAction<ISignature>) => {
            return (state = action.payload);
        },
    },
});

export const signatureReducer = signatureSlice.reducer;
export const signatureActions = signatureSlice.actions;
export const signatureSelector = (state: RootState) => state.signature;
