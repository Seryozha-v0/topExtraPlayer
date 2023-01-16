import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

const Lists = ({ videos }) => {
    const Navigate = useNavigate();
    return (
        <>
            {videos.map((item, i) => (
                <div
                    key={i}
                    className="video-list__item"
                    onClick={() => { return Navigate(`/video/${item._id}`) }}
                >
                    <div className="video-list__img">
                        <img src={item.imageUrl} />
                    </div>
                    <div className="video-list__desc">
                        <Typography variant="h6">{item.title}</Typography>
                        <Typography variant="subtitle1">{item.author}</Typography>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Lists;