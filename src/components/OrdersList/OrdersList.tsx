import React, { useEffect } from "react";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { orderActions } from "../../store/orderSlice";
import {
    ordersListAction,
    ordersListSelector,
} from "../../store/ordersListSlice";
import { CloseCircleOutlined } from "@ant-design/icons";

export const OrdersList: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const ordersList = useAppSelector(ordersListSelector);

    const handlerClickOrder = (key: string) => {
        dispatch(orderActions.openOrder(ordersList[key]));
        navigate(LINKS.input);
    };

    const handlerDeleteOrder = (id: string) => {
        dispatch(ordersListAction.deleteOrderFromList(id));
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
                            <div className={scss.orderContainer} key={item}>
                                <div
                                    className={scss.order}
                                    key={item}
                                    onClick={() => handlerClickOrder(item)}
                                >
                                    <span>
                                        {
                                            ordersList[item].title[
                                                "номер заявки:"
                                            ]
                                        }
                                    </span>{" "}
                                    от <span>{ordersList[item].date}</span>
                                </div>
                                <div
                                    className={scss.deleteButton}
                                    onClick={() => handlerDeleteOrder(item)}
                                >
                                    <CloseCircleOutlined
                                        style={{
                                            fontSize: "25px",
                                            color: "gray",
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
