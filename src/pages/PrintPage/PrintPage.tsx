import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import scss from "./styles.module.scss";

export const PrintPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.print();
        navigate(-1);
    }, []);

    return (
        <div className={scss.wrapperPrintPage}>
            <div className={scss.header}>
                <div className={scss.icon + " " + scss.ic_icon}></div>
                <div className={scss.companyTitle}>
                    <span>ОБЩЕСТВО</span>
                    <span>С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ</span>
                    <span>“АЭРОСТАР”</span>
                </div>
            </div>
            <p>Заявка на оформление</p>
        </div>
    );
};
