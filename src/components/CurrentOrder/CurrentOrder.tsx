import React, { useEffect, useRef, useState } from "react";
import scss from "./styles.module.scss";
import { getCustomsByCode } from "../../common/helper";
import { useAppSelector } from "../../store/hooks";
import { orderSelector } from "../../store/orderSlice";

export const CurrentOrder: React.FC = () => {
    const currentOrder = useAppSelector(orderSelector);
    const getRefs = () => {
        return Object.keys(currentOrder.list).map(() =>
            useRef<HTMLLIElement>(null)
        );
    };
    const refs = getRefs();
    const [coors, setCoors] = useState<number[]>([]);
    useEffect(() => {
        refs.map((el) => {
            setCoors((prevState) => [
                ...prevState,
                el.current?.getBoundingClientRect().bottom as number,
            ]);
        });
    }, []);

    return (
        <ol>
            {Object.keys(currentOrder.list).map((el, index) => (
                <li className={scss.itemList} key={el} ref={refs[index]}>
                    {coors[index] > 900 && coors[index] < 980 && (
                        <div className={scss.emptyBox}></div>
                    )}
                    <span className={scss.nameCompany}>
                        {currentOrder.list[el]["название компании:"]} -{" "}
                    </span>
                    <span className={scss.boxItemsForm}>
                        <span>
                            авианакладная №{currentOrder.list[el]["номер AWB:"]}{" "}
                            -{" "}
                        </span>
                    </span>
                    <span className={scss.boxItemsForm}>
                        <span>
                            {currentOrder.list[el]["количество мест:"]} мест /{" "}
                        </span>
                        <span>{currentOrder.list[el]["вес брутто:"]} кг,</span>
                    </span>

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
