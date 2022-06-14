import React, { useEffect, useState, SetStateAction } from "react";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";
import { Button, Input } from "antd";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { getCustomsByCode } from "../../common/helper";
import { DeleteTwoTone, EditTwoTone, CopyTwoTone } from "@ant-design/icons";
import type { IItemForm } from "../../common/helper";
import { useOrder } from "../../common/helper";

export const RegistrationPage: React.FC = () => {
    const namesForm = [
        "название компании:",
        "номер AWB:",
        "количество мест:",
        "вес брутто:",
        "код таможни:",
        "доп.информация:",
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
    const { currentOrder, setCurrentOrder } = useOrder();

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

    const handlerChangeOrderNumber = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        setCurrentOrder((prevState) => ({
            ...prevState,
            orderNumber: value,
        }));
    };

    const checkFormValidation = () => {
        let isValidation: boolean = true;
        Object.keys(itemForm).map((el) => {
            if (!itemForm[el].trim() && el !== "доп.информация:") {
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
        setCurrentOrder((prevState) => ({
            ...prevState,
            list: {
                ...prevState.list,
                [nanoid()]: itemForm,
            },
        }));
        setItemForm(getInitialForm());
    };

    const handlerEditItem = (el: string) => {
        setItemForm(currentOrder.list[el]);
        const newOrder = { ...currentOrder };
        delete newOrder.list[el];
        setCurrentOrder(newOrder);
    };

    const handlerCopyItem = (el: string) => {
        setItemForm(currentOrder.list[el]);
    };

    const handlerDeleteItem = (el: string) => {
        const newOrder = { ...currentOrder };
        delete newOrder.list[el];
        setCurrentOrder(newOrder);
    };

    return (
        <div className={scss.main}>
            <div className={scss.title}>
                <p>Формирование новой заявки</p>
                <div className={scss.numberOrder}>номер заявки:</div>
                <Input
                    size="large"
                    style={{ width: 300 }}
                    value={currentOrder.orderNumber}
                    onChange={handlerChangeOrderNumber}
                />
            </div>
            <div className={scss.sectionForm}>
                <div className={scss.inputForm}>
                    <div className={scss.subSectionForm}>
                        {Object.keys(itemForm).map((el) => (
                            <div className={scss.itemForm} key={el}>
                                <div>{el}</div>
                                <Input
                                    size="large"
                                    style={{ width: 400 }}
                                    name={el}
                                    value={itemForm[el]}
                                    onChange={handlerChange}
                                />
                                <div className={scss.errorMessage}>
                                    {errorForm[el]}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={scss.outputForm}>
                    <div className={scss.subSectionForm}>
                        <ol>
                            {Object.keys(currentOrder.list).map((el) => (
                                <li key={el}>
                                    <span>
                                        {
                                            currentOrder.list[el][
                                                "название компании:"
                                            ]
                                        }{" "}
                                        -{" "}
                                    </span>
                                    <span>
                                        авианакладная №
                                        {currentOrder.list[el]["номер AWB:"]} -{" "}
                                    </span>
                                    <span>
                                        {
                                            currentOrder.list[el][
                                                "количество мест:"
                                            ]
                                        }{" "}
                                        мест /{" "}
                                    </span>
                                    <span>
                                        {currentOrder.list[el]["вес брутто:"]}{" "}
                                        кг,
                                    </span>
                                    <div>
                                        Таможня назначения:{" "}
                                        {getCustomsByCode(
                                            currentOrder.list[el][
                                                "код таможни:"
                                            ]
                                        )}{" "}
                                        /{" "}
                                        {currentOrder.list[el]["код таможни:"]}
                                    </div>
                                    <div>
                                        {
                                            currentOrder.list[el][
                                                "доп.информация:"
                                            ]
                                        }
                                    </div>
                                    <div className={scss.itemButtons}>
                                        <div
                                            className={scss.button}
                                            onClick={() => handlerEditItem(el)}
                                        >
                                            <EditTwoTone />
                                        </div>
                                        <div
                                            className={scss.button}
                                            onClick={() => handlerCopyItem(el)}
                                        >
                                            <CopyTwoTone twoToneColor="#52c41a" />
                                        </div>
                                        <div
                                            className={scss.button}
                                            onClick={() =>
                                                handlerDeleteItem(el)
                                            }
                                        >
                                            <DeleteTwoTone twoToneColor="#eb2f96" />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
            <div className={scss.sectionButtons}>
                <Button size="large" onClick={handlerAddItemForm}>
                    добавить
                </Button>
                <Link to={LINKS.print}>
                    <Button size="large">распечатать</Button>
                </Link>
            </div>
        </div>
    );
};
