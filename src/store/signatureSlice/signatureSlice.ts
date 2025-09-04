import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
    getSignature as fsGetSignature,
    setSignature as fsSetSignature,
} from "../../services/firestore";

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
        replaceSignature: (state, action: PayloadAction<ISignature>) => {
            return (state = action.payload);
        },
    },
});

export const signatureReducer = signatureSlice.reducer;
export const signatureActions = signatureSlice.actions;
export const signatureSelector = (state: RootState) => state.signature;

// Thunks
export const fetchSignature = () => async (dispatch: any) => {
    const data = await fsGetSignature();
    if (data) dispatch(signatureActions.replaceSignature(data));
};

export const saveSignature =
    (signature: ISignature) => async (dispatch: any) => {
        await fsSetSignature(signature);
        dispatch(signatureActions.replaceSignature(signature));
    };
