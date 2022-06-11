import React from "react";
import scss from "./styles.module.scss";
import { ItemContent } from "../ItemContent";
import { format } from "date-fns";
import ruLocale from "date-fns/locale/ru";

interface IProps {}

export const Content: React.FC<IProps> = () => {
    const date = format(new Date(), "dd MMMM yyy", { locale: ruLocale });
    const orderNumber = "01/06-Д";

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
                ЗАЯВКА №{orderNumber} от {date}г.
            </p>
            <div className={scss.preamble}>
                На основании договора № 0717-02 от 01/12/2021г. просим Вас
                осуществить оформление транзитных деклараций для грузов,
                поступивших в аэропорт Шереметьево в адрес:
            </div>
            <div className={scss.ordersList}>
                <ItemContent />
            </div>
        </div>
    );
};
