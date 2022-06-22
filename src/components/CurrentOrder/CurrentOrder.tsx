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
                        {
                            currentOrder.list[
                                el as keyof typeof currentOrder.list
                            ]["название компании:"]
                        }{" "}
                        -{" "}
                    </span>
                    <span>
                        авианакладная №
                        {
                            currentOrder.list[
                                el as keyof typeof currentOrder.list
                            ]["номер AWB:"]
                        }{" "}
                        -{" "}
                    </span>
                    <span>
                        {
                            currentOrder.list[
                                el as keyof typeof currentOrder.list
                            ]["количество мест:"]
                        }{" "}
                        мест /{" "}
                    </span>
                    <span>
                        {
                            currentOrder.list[
                                el as keyof typeof currentOrder.list
                            ]["вес брутто:"]
                        }{" "}
                        кг,
                    </span>
                    <div>
                        Таможня назначения:{" "}
                        {getCustomsByCode(
                            currentOrder.list[
                                el as keyof typeof currentOrder.list
                            ]["код таможни:"]
                        )}{" "}
                        /{" "}
                        {
                            currentOrder.list[
                                el as keyof typeof currentOrder.list
                            ]["код таможни:"]
                        }
                    </div>
                    <div>
                        {
                            currentOrder.list[
                                el as keyof typeof currentOrder.list
                            ]["доп.информация:"]
                        }
                    </div>
                </li>
            ))}
        </ol>
    );
};
