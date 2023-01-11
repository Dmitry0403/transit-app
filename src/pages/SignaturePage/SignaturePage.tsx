import React, { useState, useEffect } from "react";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";
import { Button, Input } from "antd";
import type { ISignature } from "../../store/signatureSlice";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
    signatureSelector,
    signatureActions,
} from "../../store/signatureSlice";

export const SignaturePage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const signature = useAppSelector(signatureSelector);

    const [itemForm, setItemForm] = useState<ISignature>(signature);
    const [errorForm, setErrorForm] = useState<ISignature>({
        position: "",
        fullName: "",
    });

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name;
        const value = e.target.value;
        setItemForm((prevState) => ({
            ...prevState,
            [key]: value,
        }));
        if (errorForm[key as keyof typeof errorForm]) {
            setErrorForm((prevState) => ({
                ...prevState,
                [key]: "",
            }));
        }
    };

    const checkFormValidation = () => {
        let isValidation: boolean = true;
        Object.keys(itemForm).map((el) => {
            if (!itemForm[el as keyof typeof itemForm].trim()) {
                setErrorForm((prevState) => ({
                    ...prevState,
                    [el]: "обязательное поле",
                }));
                isValidation = false;
            }
        });
        return isValidation;
    };

    const handlerSaveSignature = () => {
        if (checkFormValidation()) {
            dispatch(signatureActions.changeSignature(itemForm));
            localStorage.setItem("signature", JSON.stringify(itemForm));
            navigate(LINKS.home);
        }
    };

    return (
        <div className={scss.main}>
            <div className={scss.title}>
                <p>Изменение подписи</p>
            </div>
            <div className={scss.form}>
                <div className={scss.itemForm}>
                    <div className={scss.titleItemForm}>должность:</div>
                    <Input
                        size="large"
                        style={{ width: 300 }}
                        name="position"
                        value={itemForm.position}
                        onChange={handlerChange}
                    />
                    <div className={scss.errorMessage}>
                        {errorForm.position}
                    </div>
                </div>
                <div className={scss.itemForm}>
                    <div className={scss.titleItemForm}>ФИО:</div>
                    <Input
                        size="large"
                        style={{ width: 300 }}
                        name="fullName"
                        value={itemForm.fullName}
                        onChange={handlerChange}
                    />
                    <div className={scss.errorMessage}>
                        {errorForm.fullName}
                    </div>
                </div>
                <Button
                    size="large"
                    style={{ minWidth: 110 }}
                    onClick={handlerSaveSignature}
                >
                    coхранить
                </Button>
            </div>
        </div>
    );
};
