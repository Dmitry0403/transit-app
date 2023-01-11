import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { StartPage } from "../../pages/StartPage";
import { MasterPage } from "../../pages/MasterPage";
import { LINKS } from "../../common/routes";
import { PrintPage } from "../../pages/PrintPage";
import { RegistrationPage } from "../../pages/RegistrationPage";
import { SignaturePage } from "../../pages/SignaturePage";

export const App: React.FC = () => {
    return (
        <Routes>
            <Route path={LINKS.home} element={<MasterPage />}>
                <Route index element={<StartPage />} />
                <Route path={LINKS.signature} element={<SignaturePage />} />
                <Route path={LINKS.input} element={<RegistrationPage />} />
                <Route path={LINKS.print} element={<PrintPage />} />
                <Route path="*" element={<Navigate to={LINKS.home} />} />
            </Route>
        </Routes>
    );
};
