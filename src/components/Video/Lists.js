import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import format from "../../libs/format";
import { Visibility } from "@mui/icons-material";

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
                        <div className="video-list__duration">{format(item.metaData.duration)}</div>
                    </div>
                    <div className="video-list__desc">
                        <Typography variant="subtitle1">{(item.title)}</Typography>
                        <Typography variant="subtitle2">{item.author}</Typography>
                        <Stack direction="row" alignItems='center' spacing={1}>
                            <Visibility fontSize="small" />
                            <Typography variant="caption">{item.watchedCount} просмотров</Typography>
                        </Stack>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Lists;