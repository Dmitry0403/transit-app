import React, { useEffect } from "react";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { orderSelector, orderActions } from "../../store/orderSlice";
import { ordersListSelector } from "../../store/ordersListSlice";

export const OrdersList: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const ordersList = useAppSelector(ordersListSelector);

    const handlerClickOrder = (item: string) => {
        dispatch(orderActions.openOrder(ordersList[item]));
        navigate(LINKS.input);
    };

    useEffect(() => {
        localStorage.setItem("ordersList", JSON.stringify(ordersList));
    }, [ordersList]);

    return (
        <div className={scss.ordersList}>
            <div className={scss.title}>список заявок:</div>
            {!Object.keys(ordersList).length ? (
                <div>пока здесь пусто</div>
            ) : (
                <div className={scss.subOrdersList}>
                    <div className={scss.list}>
                        {Object.keys(ordersList).map((item) => (
                            <div
                                className={scss.order}
                                key={item}
                                onClick={() => handlerClickOrder(item)}
                            >
                                <span>
                                    {
                                        ordersList[
                                            item as keyof typeof ordersList
                                        ].title["номер заявки:"]
                                    }
                                </span>{" "}
                                от{" "}
                                <span>
                                    {
                                        ordersList[
                                            item as keyof typeof ordersList
                                        ].date
                                    }
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
