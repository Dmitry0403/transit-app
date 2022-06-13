import React, { useEffect, useState } from "react";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";
import { Button, Input } from "antd";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import { getCustomsByCode } from "../../common/helper";
import { DeleteTwoTone, EditTwoTone, CopyTwoTone } from "@ant-design/icons";

interface IItemForm {
    [key: string]: string;
}

interface IOrder {
    orderNumber: string;
    list: {
        [idItemOrder: string]: IItemForm;
    };
}

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

    const getInitialOrderList = () => {
        if (localStorage.getItem("currentOrder")) {
            return JSON.parse(localStorage.getItem("currentOrder") as string);
        } else return { orderNumber: "", list: {} };
    };

    const [itemForm, setItemForm] = useState<IItemForm>(getInitialForm());
    const [errorForm, setErrorForm] = useState<IItemForm>(getInitialForm());
    const [orderList, setOrderList] = useState<IOrder>(getInitialOrderList());

    useEffect(() => {
        localStorage.setItem("currentOrder", JSON.stringify(orderList));
    }, [orderList]);

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
        setOrderList((prevState) => ({
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
        setOrderList((prevState) => ({
            ...prevState,
            list: {
                ...prevState.list,
                [nanoid()]: itemForm,
            },
        }));
        setItemForm(getInitialForm());
    };

    const handlerEditItem = (el: string) => {
        setItemForm(orderList.list[el]);
        const newOrderList = { ...orderList };
        delete newOrderList.list[el];
        setOrderList(newOrderList);
    };

    const handlerCopyItem = (el: string) => {
        setItemForm(orderList.list[el]);
    };

    const handlerDeleteItem = (el: string) => {
        const newOrderList = { ...orderList };
        delete newOrderList.list[el];
        setOrderList(newOrderList);
    };

    return (
        <div className={scss.main}>
            <div className={scss.title}>
                <p>Формирование новой заявки</p>
                <div className={scss.numberOrder}>номер заявки:</div>
                <Input
                    size="large"
                    style={{ width: 300 }}
                    value={orderList.orderNumber}
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
                            {Object.keys(orderList.list).map((el) => (
                                <li key={el}>
                                    <span>
                                        {
                                            orderList.list[el][
                                                "название компании:"
                                            ]
                                        }{" "}
                                        -{" "}
                                    </span>
                                    <span>
                                        авианакладная №
                                        {orderList.list[el]["номер AWB:"]} -{" "}
                                    </span>
                                    <span>
                                        {orderList.list[el]["количество мест:"]}{" "}
                                        мест /{" "}
                                    </span>
                                    <span>
                                        {orderList.list[el]["вес брутто:"]} кг,
                                    </span>
                                    <div>
                                        Таможня назначения:{" "}
                                        {getCustomsByCode(
                                            orderList.list[el]["код таможни:"]
                                        )}{" "}
                                        / {orderList.list[el]["код таможни:"]}
                                    </div>
                                    <div>
                                        {orderList.list[el]["доп.информация:"]}
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
                <Button size="large">распечатать</Button>
            </div>
        </div>
    );
};
