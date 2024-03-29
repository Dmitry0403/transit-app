import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PrintContent } from "../../components/PrintContent";
import { LINKS } from "../../common/routes";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { orderSelector } from "../../store/orderSlice";
import { ordersListAction } from "../../store/ordersListSlice";
import scss from "./styles.module.scss";

export const PrintPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentOrder = useAppSelector(orderSelector);

    useEffect(() => {
        setTimeout(() => {
            window.print();
            dispatch(ordersListAction.addedOrderToList(currentOrder));
            navigate(LINKS.home);
        }, 600);
    }, []);

    return (
        <div className={scss.wrapperPrintPage}>
            <div className={scss.header}>
                <div className={scss.ic_icon}></div>
                <div className={scss.companyTitle}>
                    <span>ОБЩЕСТВО</span>
                    <span>С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ</span>
                    <span>“АЭРОСТАР”</span>
                </div>
            </div>
            <div className={scss.printContent}>
                <PrintContent />
            </div>
            <div className={scss.footer}>
                <span>
                    Республика Беларусь, 222201, Минская обл., г. Смолевичи, ул.
                    Советская, 68-24
                </span>
                <span>
                    Грузовой отдел: тел.(017)279-14-19, 279-12-93, факс:
                    279-14-19
                </span>
                <span>
                    Таможенный отдел: тел.(017)279-21-56, 279-22-56, факс:
                    279-20-56
                </span>
                <span>УНН 600299506, ОКПО 06084802</span>
                <span>www.aerostar.by e-mail: aerostar@aerostar.by</span>
            </div>
        </div>
    );
};
