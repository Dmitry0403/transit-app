import React from "react";
import scss from "./styles.module.scss";
import { LINKS } from "../../common/routes";
import { Button } from "antd";
import { Link } from "react-router-dom";

export const StartPage: React.FC = () => {
    return (
        <div>
            <p>создать новую заявку</p>
            <Link to={LINKS.input}>
                <Button size="large" type="dashed">
                    Let's go
                </Button>
            </Link>
        </div>
    );
};
