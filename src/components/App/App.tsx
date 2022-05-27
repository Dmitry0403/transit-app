import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { StartPage } from "../../pages/StartPage";
import { MasterPage } from "../../pages/MasterPage";
import { LINKS } from "../../common/routes";

export const App: React.FC = () => {
    return (
        <Routes>
            <Route path={LINKS.home} element={<MasterPage />}>
                <Route index element={<StartPage />} />
                <Route path="*" element={<Navigate to={LINKS.home} />} />
            </Route>
        </Routes>
    );
};
