import React, { useState, useEffect } from "react";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";
import { Button, Input, Select, Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { getCustomsByCode } from "../../common/helper";
import { DeleteTwoTone, EditTwoTone, CopyTwoTone } from "@ant-design/icons";
import type { IItemForm } from "../../store/orderSlice";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { orderSelector, orderActions } from "../../store/orderSlice";
import { ordersListAction } from "../../store/ordersListSlice";

interface IErrorTitle {
    "номер заявки:": string;
    "номер автомобиля:": string;
    "ФИО водителя:": string;
}

export const RegistrationPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { Option } = Select;
    const namesForm = [
        "название компании:",
        "номер AWB:",
        "количество мест:",
        "вес брутто:",
        "код таможни:",
        "доп.информация:",
    ];
    const trucksNumbers = [
        "AC 7769-5",
        "AM 1019-5",
        "AT 9287-5",
        "AT 9288-5",
        "AM 2957-5",
        "AM 9118-5",
        "AK 4733-5",
        "AT 2761-5",
        "AT 2762-5",
        "AP 7963-5",
        "AP 9736-5",
        "AT 0887-5",
        "AO 9568-5",
    ];

    const driversNames = [
        "Бабрович Юрий",
        "Медведь Валерий",
        "Медведь Вадим",
        "Шенец Сергей",
        "Воронецкий Михаил",
        "Латушко Олег",
        "Присенко Александр",
        "Игнатович Геннадий",
        "Бакунович Александр",
        "Вершенко Юрий",
    ];

    const aeroports = ["Шереметьево", "Внуково"];

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
        if (errorTitle[key as keyof typeof errorTitle]) {
            setErrorTitle((prevState) => ({
                ...prevState,
                [key]: "",
            }));
        }
    };

    const handlerSelectTitle = (value: string, key: string) => {
        dispatch(orderActions.changeTitleOrder({ key, value }));
        if (errorTitle[key as keyof typeof errorTitle]) {
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
        dispatch(orderActions.addedItemOrder(itemForm));
        setItemForm(getInitialForm());
    };

    const handlerEditItem = (id: string) => {
        setItemForm(currentOrder.list[id]);
        dispatch(orderActions.deleteItemOrder(id));
        setErrorForm(getInitialForm());
    };

    const handlerCopyItem = (el: string) => {
        setItemForm(currentOrder.list[el]);
        setErrorForm(getInitialForm());
    };

    const handlerDeleteItem = (id: string) => {
        dispatch(orderActions.deleteItemOrder(id));
    };

    const handlerSaveOrder = () => {
        dispatch(ordersListAction.addedOrderToList(currentOrder));
        navigate(LINKS.home);
    };

    const handlerPrintOrder = () => {
        if (!checkTitleValidation()) return;
        navigate(LINKS.print);
    };

    const handlerCkeckBoxChange = (e: CheckboxChangeEvent) => {
        dispatch(orderActions.changeCheckBox(e.target.checked));
    };

    return (
        <div className={scss.main}>
            <div className={scss.title}>
                <p>
                    Формирование новой заявки в аэропорту
                    <span>
                        {" "}
                        <Select
                            size="large"
                            defaultValue={
                                currentOrder.title["аэропорт:"] || "Шереметьево"
                            }
                            style={{ width: 200, textAlign: "left" }}
                            onChange={(value: string) =>
                                handlerSelectTitle(value, "аэропорт:")
                            }
                        >
                            {aeroports.map((el) => (
                                <Option key={el} value={el}>
                                    {el}
                                </Option>
                            ))}
                        </Select>
                    </span>
                </p>
                <div className={scss.titleForm}>
                    <div className={scss.itemForm}>
                        <div>номер заявки:</div>
                        <Input
                            size="large"
                            style={{ width: 300 }}
                            name={"номер заявки:"}
                            value={currentOrder.title["номер заявки:"]}
                            onChange={handlerChangeTitle}
                        />
                        <div className={scss.errorMessage}>
                            {errorTitle["номер заявки:"]}
                        </div>
                    </div>
                    <div className={scss.itemForm}>
                        <div>номер автомобиля:</div>
                        <Select
                            size="large"
                            defaultValue={
                                currentOrder.title["номер автомобиля:"]
                            }
                            style={{ width: 300, textAlign: "left" }}
                            onChange={(value: string) =>
                                handlerSelectTitle(value, "номер автомобиля:")
                            }
                        >
                            {trucksNumbers.map((el) => (
                                <Option key={el} value={el}>
                                    {el}
                                </Option>
                            ))}
                        </Select>
                        <div className={scss.errorMessage}>
                            {errorTitle["номер автомобиля:"]}
                        </div>
                        <div className={scss.checkbox}>
                            прицеп{" "}
                            <Checkbox
                                defaultChecked={currentOrder.isTrailer}
                                onChange={handlerCkeckBoxChange}
                            ></Checkbox>
                        </div>
                    </div>
                    <div className={scss.itemForm}>
                        <div>ФИО водителя:</div>
                        <Select
                            size="large"
                            defaultValue={currentOrder.title["ФИО водителя:"]}
                            style={{ width: 300, textAlign: "left" }}
                            onChange={(value: string) =>
                                handlerSelectTitle(value, "ФИО водителя:")
                            }
                        >
                            {driversNames.map((el) => (
                                <Option key={el} value={el}>
                                    {el}
                                </Option>
                            ))}
                        </Select>
                        <div className={scss.errorMessage}>
                            {errorTitle["ФИО водителя:"]}
                        </div>
                    </div>
                </div>
            </div>
            <div className={scss.sectionForm}>
                <div className={scss.subSectionForm}>
                    <div className={scss.form}>
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
                <div className={scss.subSectionForm}>
                    <div className={scss.form}>
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
                                    <span className={scss.boxItemsForm}>
                                        авианакладная №
                                        {currentOrder.list[el]["номер AWB:"]} -{" "}
                                    </span>
                                    <div className={scss.boxItemsForm}>
                                        <span>
                                            {
                                                currentOrder.list[el][
                                                    "количество мест:"
                                                ]
                                            }{" "}
                                            мест /{" "}
                                        </span>
                                        <span>
                                            {
                                                currentOrder.list[el][
                                                    "вес брутто:"
                                                ]
                                            }{" "}
                                            кг,
                                        </span>
                                    </div>
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
            <div className={scss.footerButtons}>
                <div className={scss.subFooterButtons}>
                    <Button
                        size="large"
                        style={{ minWidth: 110 }}
                        onClick={handlerAddItemForm}
                    >
                        добавить
                    </Button>
                </div>
                <div className={scss.subFooterButtons}>
                    <Button
                        size="large"
                        style={{ minWidth: 110 }}
                        className={scss.footerItemButton}
                        onClick={() => navigate(LINKS.home)}
                    >
                        отмена
                    </Button>
                    <Button
                        size="large"
                        style={{ minWidth: 110 }}
                        className={scss.footerItemButton}
                        onClick={handlerSaveOrder}
                    >
                        сохранить
                    </Button>
                    <Button
                        size="large"
                        style={{ minWidth: 110 }}
                        onClick={handlerPrintOrder}
                    >
                        распечатать
                    </Button>
                </div>
            </div>
        </div>
    );
};
