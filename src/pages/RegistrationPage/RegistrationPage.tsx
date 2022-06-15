import React, { useState } from "react";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";
import { Button, Input } from "antd";
import { nanoid } from "nanoid";
import { getCustomsByCode } from "../../common/helper";
import { DeleteTwoTone, EditTwoTone, CopyTwoTone } from "@ant-design/icons";
import type { IItemForm } from "../../common/helper";
import { useOrder } from "../../common/helper";
import { useNavigate } from "react-router-dom";

interface IErrorTitle {
    "номер заявки:": string;
    "номер автомобиля:": string;
    "ФИО водителя": string;
}

export const RegistrationPage: React.FC = () => {
    const navigate = useNavigate();

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
    const [errorTitle, setErrorTitle] = useState<IErrorTitle>({
        "номер заявки:": "",
        "номер автомобиля:": "",
        "ФИО водителя": "",
    });
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

    const handlerChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name;
        const value = e.target.value;
        setCurrentOrder((prevState) => ({
            ...prevState,
            title: {
                ...prevState.title,
                [key]: value,
            },
        }));
        if (errorTitle[key as keyof typeof currentOrder.title]) {
            setErrorTitle((prevState) => ({
                ...prevState,
                [key]: "",
            }));
        }
    };

    const checkFormValidation = () => {
        let isValidation: boolean = true;
        Object.keys(itemForm).map((el) => {
            if (!itemForm[el].trim() && el !== "доп.информация:") {
                setErrorForm((prevState) => ({
                    ...prevState,
                    [el]: "обязательное поле",
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

    const checkTitleValidation = () => {
        let isValidation: boolean = true;
        Object.keys(currentOrder.title).map((el) => {
            if (
                !currentOrder.title[
                    el as keyof typeof currentOrder.title
                ].trim()
            ) {
                setErrorTitle((prevState) => ({
                    ...prevState,
                    [el]: "обязательное поле",
                }));
                isValidation = false;
            }
        });
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

    const handlerPrintOrder = () => {
        if (!checkTitleValidation()) return;
        navigate(LINKS.print);
    };

    return (
        <div className={scss.main}>
            <div className={scss.title}>
                <p>Формирование новой заявки</p>
                <div className={scss.titleForm}>
                    {Object.keys(currentOrder.title).map((el) => (
                        <div className={scss.itemForm} key={el}>
                            <div>{el}</div>
                            <Input
                                size="large"
                                style={{ width: 300 }}
                                name={el}
                                value={
                                    currentOrder.title[
                                        el as keyof typeof currentOrder.title
                                    ]
                                }
                                onChange={handlerChangeTitle}
                            />
                            <div className={scss.errorMessage}>
                                {errorTitle[el as keyof typeof errorTitle]}
                            </div>
                        </div>
                    ))}
                </div>
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
                <Button size="large" onClick={handlerPrintOrder}>
                    распечатать
                </Button>
            </div>
        </div>
    );
};
