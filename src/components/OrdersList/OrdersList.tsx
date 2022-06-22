import React from "react";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";
import { useOrder, useOrdersList } from "../../common/helper";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export const OrdersList: React.FC = () => {
    const navigate = useNavigate();
    const { ordersList } = useOrdersList();
    const { setCurrentOrder } = useOrder();

    const handlerClickOrder = (item: string) => {
        setCurrentOrder(ordersList[item]);
        navigate(LINKS.input);
    };

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
