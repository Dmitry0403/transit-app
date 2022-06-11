import React, { useState } from "react";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";
import { Button, Input } from "antd";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { getCustomsByCode } from "../../common/helper";

interface IItemForm {
    [key: string]: string;
}

interface IItemsList {
    [idItemOrder: string]: IItemForm;
}

export const RegistrationPage: React.FC = () => {
    const namesForm = [
        "название компании:",
        "номер AWB:",
        "количество мест:",
        "вес брутто:",
        "код таможни:",
    ];

    const getInitialForm = (): IItemForm => {
        return namesForm.reduce(
            (obj, el) => ({
                ...obj,
                [el]: "",
            }),
            {}
        );
    };

    const [itemForm, setItemForm] = useState<IItemForm>(getInitialForm());
    const [errorForm, setErrorForm] = useState<IItemForm>(getInitialForm());

    const [itemsList, setItemsList] = useState<IItemsList>({});

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name;
        const value = e.target.value;
        setItemForm((prevState) => ({
            ...prevState,
            [key]: value,
        }));
        if (errorForm[key]) {
            setErrorForm((prevState) => ({
                ...prevState,
                [key]: "",
            }));
        }
    };

    const checkFormValidation = () => {
        let isValidation: boolean = true;
        Object.keys(itemForm).map((el) => {
            if (!itemForm[el].trim()) {
                setErrorForm((prevState) => ({
                    ...prevState,
                    [el]: "заполните поле",
                }));
                isValidation = false;
            }
        });
        if (
            itemForm["код таможни:"] &&
            getCustomsByCode(itemForm["код таможни:"]) ===
                "введите правильный код"
        ) {
            setErrorForm((prevState) => ({
                ...prevState,
                ["код таможни:"]: "введите правильный код",
            }));
            isValidation = false;
        }
        return isValidation;
    };

    const handlerAddItemForm = () => {
        if (!checkFormValidation()) return;
        setItemsList((prevState) => ({
            ...prevState,
            [nanoid()]: itemForm,
        }));
        setItemForm(getInitialForm());
    };

    return (
        <div>
            <p>Формирование новой заявки</p>
            <div>номер заявки:</div>
            <Input size="large" style={{ width: 300 }} />
            <p>Добавление груза:</p>
            <div className={scss.registrationForm}>
                <div className={scss.inputForm}>
                    {Object.keys(itemForm).map((el) => (
                        <div className={scss.itemForm} key={el}>
                            <div>{el}</div>
                            <Input
                                size="large"
                                style={{ width: 300 }}
                                name={el}
                                value={itemForm[el]}
                                onChange={handlerChange}
                            />
                            <div className={scss.errorMessage}>
                                {errorForm[el]}
                            </div>
                        </div>
                    ))}
                    <Button size="large" onClick={handlerAddItemForm}>
                        добавить
                    </Button>
                </div>
                <ol className={scss.outputForm}>
                    {Object.keys(itemsList).map((el) => (
                        <li key={el}>
                            <span>
                                {itemsList[el]["название компании:"]} -{" "}
                            </span>
                            <span>
                                авианакладная №{itemsList[el]["номер AWB:"]} -{" "}
                            </span>
                            <span>
                                {itemsList[el]["количество мест:"]} мест /{" "}
                            </span>
                            <span>{itemsList[el]["вес брутто:"]} кг,</span>
                            <div>
                                Таможня назначения - ПТО:{" "}
                                {itemsList[el]["код таможни:"]} /{" "}
                                {getCustomsByCode(
                                    itemsList[el]["код таможни:"]
                                )}
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
};
