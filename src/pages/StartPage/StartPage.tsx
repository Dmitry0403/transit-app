import React from "react";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { OrdersList } from "../../components/OrdersList";

export const StartPage: React.FC = () => {
    return (
        <div className={scss.startPage}>
            <div className={scss.newOrder}>
                <div className={scss.title}>создать новую заявку</div>
                <Link to={LINKS.input}>
                    <Button
                        size="large"
                        type="dashed"
                        className={scss.buttonNewOrder}
                    >
                        новая заявка
                    </Button>
                </Link>
            </div>
            <div className={scss.ordersList}>
                <OrdersList />
            </div>
        </div>
    );
};
