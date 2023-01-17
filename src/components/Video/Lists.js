import React from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const Lists = ({ videos, format }) => {
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
                        <div className="video-list__duration">{format(item.metaData.duration)}</div>
                    </div>
                    <div className="video-list__desc">
                        <Typography variant="h6">{(item.title)}</Typography>
                        <Typography variant="subtitle1">{item.author}</Typography>
                        <Typography variant="body2">{item.watchedCount} просмотров</Typography>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Lists;