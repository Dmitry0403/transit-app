import React, { useState, useEffect } from "react";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";
import { Button, Input } from "antd";
import { nanoid } from "nanoid";
import { getCustomsByCode } from "../../common/helper";
import { DeleteTwoTone, EditTwoTone, CopyTwoTone } from "@ant-design/icons";
import type { IItemForm } from "../../common/helper";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { orderSelector, orderActions } from "../../store/orderSlice";

interface IErrorTitle {
    "номер заявки:": string;
    "номер автомобиля:": string;
    "ФИО водителя:": string;
}

export const RegistrationPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
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
        "ФИО водителя:": "",
    });

    const currentOrder = useAppSelector(orderSelector);

    useEffect(() => {
        localStorage.setItem("currentOrder", JSON.stringify(currentOrder));
    }, [currentOrder]);

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
        dispatch(orderActions.changeTitleOrder({ key, value }));
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
        const newListOrder = { ...currentOrder.list, [nanoid()]: itemForm };
        dispatch(orderActions.changeOrder(newListOrder));
        setItemForm(getInitialForm());
    };

    const handlerEditItem = (el: string) => {
        setItemForm(currentOrder.list[el as keyof typeof currentOrder.list]);
        const newListOrder = { ...currentOrder.list };
        delete newListOrder[el as keyof typeof currentOrder.list];
        dispatch(orderActions.changeOrder(newListOrder));
        setErrorForm(getInitialForm());
    };

    const handlerCopyItem = (el: string) => {
        setItemForm(currentOrder.list[el as keyof typeof currentOrder.list]);
        setErrorForm(getInitialForm());
    };

    const handlerDeleteItem = (el: string) => {
        const newListOrder = { ...currentOrder.list };
        delete newListOrder[el as keyof typeof currentOrder.list];
        dispatch(orderActions.changeOrder(newListOrder));
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
                                            currentOrder.list[
                                                el as keyof typeof currentOrder.list
                                            ]["название компании:"]
                                        }{" "}
                                        -{" "}
                                    </span>
                                    <span>
                                        авианакладная №
                                        {
                                            currentOrder.list[
                                                el as keyof typeof currentOrder.list
                                            ]["номер AWB:"]
                                        }{" "}
                                        -{" "}
                                    </span>
                                    <span className={scss.goodsData}>
                                        <span>
                                            {
                                                currentOrder.list[
                                                    el as keyof typeof currentOrder.list
                                                ]["количество мест:"]
                                            }{" "}
                                            мест /{" "}
                                        </span>
                                        <span>
                                            {
                                                currentOrder.list[
                                                    el as keyof typeof currentOrder.list
                                                ]["вес брутто:"]
                                            }{" "}
                                            кг,
                                        </span>
                                    </span>

                                    <div>
                                        Таможня назначения:{" "}
                                        {getCustomsByCode(
                                            currentOrder.list[
                                                el as keyof typeof currentOrder.list
                                            ]["код таможни:"]
                                        )}{" "}
                                        /{" "}
                                        {
                                            currentOrder.list[
                                                el as keyof typeof currentOrder.list
                                            ]["код таможни:"]
                                        }
                                    </div>
                                    <div>
                                        {
                                            currentOrder.list[
                                                el as keyof typeof currentOrder.list
                                            ]["доп.информация:"]
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
