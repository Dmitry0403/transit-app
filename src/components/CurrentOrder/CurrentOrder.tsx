import React from "react";
import scss from "./styles.module.scss";
import { getCustomsByCode } from "../../common/helper";
import { useAppSelector } from "../../store/hooks";
import { orderSelector } from "../../store/orderSlice";

export const CurrentOrder: React.FC = () => {
    const currentOrder = useAppSelector(orderSelector);
    return (
        <ol>
            {Object.keys(currentOrder.list).map((el) => (
                <li className={scss.itemList} key={el}>
                    <span>
                        {currentOrder.list[el]["название компании:"]} -{" "}
                    </span>
                    <span>
                        авианакладная №{currentOrder.list[el]["номер AWB:"]} -{" "}
                    </span>
                    <span>
                        {currentOrder.list[el]["количество мест:"]} мест /{" "}
                    </span>
                    <span>{currentOrder.list[el]["вес брутто:"]} кг,</span>
                    <div>
                        Таможня назначения:{" "}
                        {getCustomsByCode(
                            currentOrder.list[el]["код таможни:"]
                        )}{" "}
                        / {currentOrder.list[el]["код таможни:"]}
                    </div>
                    <div>{currentOrder.list[el]["доп.информация:"]}</div>
                </li>
            ))}
        </ol>
    );
};
