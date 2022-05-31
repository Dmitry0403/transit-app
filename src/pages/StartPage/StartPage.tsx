import React from "react";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";
import { Button } from "antd";
import { Link } from "react-router-dom";

export const StartPage: React.FC = () => {
    return (
        <div>
            <p>Привет</p>
            <Link to={LINKS.print}>
                <Button>распечатать</Button>
            </Link>
        </div>
    );
};
