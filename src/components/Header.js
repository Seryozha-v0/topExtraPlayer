import { Typography } from "@mui/material";
import ButtonG from "@mui/material/Button"
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div style={{ height: '50px', color: 'white', marginBottom: '10px', padding: '10px' }}>
            <ButtonG variant="contained">
                <Link to={"/video/"} style={{ color: 'inherit' }}>Главная</Link>
            </ButtonG>
        </div>
    )
};

export default Header;