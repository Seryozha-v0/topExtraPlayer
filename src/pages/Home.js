import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <Link to={'/video/001'}>001</Link>
            <Link to={'/video/002'}>002</Link>
            <Link to={'/video/003'}>003</Link>
        </>
    )
};

export default Home;