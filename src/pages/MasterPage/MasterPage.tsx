import React from "react";
import scss from "./styles.module.scss";
import { Outlet } from "react-router-dom";

export const MasterPage: React.FC = () => {
    return (
        <div className={scss.wrapper}>
            <div className={scss.wrapperChildren}>
                <Outlet />
            </div>
        </div>
    );
};
