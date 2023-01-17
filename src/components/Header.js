import { Typography } from "@mui/material";
import ButtonG from "@mui/material/Button"
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <ButtonG variant="outlined" href="/video/">
                Главная
            </ButtonG>
        </header>
    )
};

export default Header;