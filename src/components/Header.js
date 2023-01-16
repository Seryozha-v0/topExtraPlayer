import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div style={{ height: '50px', background: 'black', color: 'white', textAlign: 'center', marginBottom: '10px' }}>
            <Link to={"/video/"}>Главная</Link>
        </div>
    )
};

export default Header;