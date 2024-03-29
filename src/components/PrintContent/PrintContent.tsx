import React from "react";
import scss from "./styles.module.scss";
import { CurrentOrder } from "../CurrentOrder";
import { useAppSelector } from "../../store/hooks";
import { orderSelector } from "../../store/orderSlice";
import { signatureSelector } from "../../store/signatureSlice";

export const PrintContent: React.FC = () => {
    const signature = useAppSelector(signatureSelector);
    const currentOrder = useAppSelector(orderSelector);
    const orderNumber = currentOrder.title["номер заявки:"];

    return (
        <div className={scss.content}>
            <div className={scss.toWhom}>
                <div>
                    <p>Генеральному директору</p>
                    <p>ЗАО «Специальная Транспортная Служба»</p>
                    <p>Дееву А.Г. </p>
                </div>
            </div>
            <p className={scss.order}>
                ЗАЯВКА №{orderNumber} от {currentOrder.date}г.
            </p>
            <div className={scss.preamble}>
                На основании договора № 0046-02/04 от 29/04/2022г. просим Вас
                осуществить оформление транзитных деклараций для грузов,
                поступивших в аэропорт{" "}
                {currentOrder.title["аэропорт:"] || "Шереметьево"} в адрес:
            </div>
            <div className={scss.currentOrder}>
                <CurrentOrder />
            </div>
            <div className={scss.paragraph}>
                Номер автомобиля: {currentOrder.title["номер автомобиля:"]}
                {currentOrder.isTrailer && <span>/ A 1482 E-5</span>}.{" "}
                {currentOrder.title["ФИО водителя:"]}
            </div>
            <div className={scss.paragraph}>
                Оплату выполненных работ гарантируем.
            </div>
            <div className={scss.signature}>
                <div>{signature.position}</div>
                <div>{signature.fullName}</div>
            </div>
        </div>
    );
};
