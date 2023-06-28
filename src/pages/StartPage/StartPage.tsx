import React from "react";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { OrdersList } from "../../components/OrdersList";
import { signatureSelector } from "../../store/signatureSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { orderActions } from "../../store/orderSlice";

export const StartPage: React.FC = () => {
    const signature = useAppSelector(signatureSelector);
    const dispatch = useAppDispatch();
    const handlerCreateNewOrder = () => {
        dispatch(orderActions.createOrder());
    };
    return (
        <div className={scss.startPage}>
            <div className={scss.newOrder}>
                <div className={scss.title}>создать новую заявку</div>
                <Link to={LINKS.input}>
                    <Button
                        size="large"
                        type="dashed"
                        className={scss.buttonNewOrder}
                        onClick={handlerCreateNewOrder}
                    >
                        новая заявка
                    </Button>
                </Link>
            </div>
            <div className={scss.ordersList}>
                <OrdersList />
            </div>
            <div className={scss.signature}>
                <div>{signature.position}</div>
                <div>{signature.fullName}</div>
                <Link to={LINKS.signature}>
                    <Button size="middle" type="dashed">
                        изменить
                    </Button>
                </Link>
            </div>
        </div>
    );
};
