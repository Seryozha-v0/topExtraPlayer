import { Typography, Avatar, Stack, Skeleton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchVideos } from "../Redux/slices/videos";

const format = (seconds) => {
    if (isNaN(seconds)) {
        return '00:00';
    }

    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');

    if (hh) {
        return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    } else {
        return `${mm.toString().padStart(2, '0')}:${ss}`;
    }
}

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
                        <Typography variant="h6">{item.title}</Typography>
                        <Stack direction="row" spacing={1}>
                            <Avatar alt="Remy Sharp" sx={{ width: 22, height: 22 }} src="http://localhost:4400/uploads/musicImage/Anything_You_Need.jpg" />
                            <Typography variant="subtitle1">{item.author}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1}>
                            <Visibility fontSize="small" />
                            <Typography variant="body2">{item.watchedCount} просмотров</Typography>
                        </Stack>
                    </div>
                </div>
            ))}
        </>
    )
}

const Home = () => {
    const dispatch = useDispatch();
    const { videos } = useSelector(state => state.videos);
    const listsLoading = videos.status === 'loading';

    useEffect(() => {
        dispatch(fetchVideos());
    }, []);

    return (
        <div className="home-list">
            {listsLoading ? (
                <>
                    {[1, 2, 3, 4, 5].map((item, i) => (
                        <div
                            key={i}
                            className="video-list__item"
                        >
                            <div className="video-list__img">
                                <Skeleton variant="rounded" width={'100%'} height={'100%'} />
                            </div>
                            <div className="video-list__desc">
                                <Skeleton variant="text" width={100} sx={{ fontSize: '2rem' }} />
                                <Stack direction="row" spacing={1}>
                                    <Skeleton variant="circular" width={22} height={22} />
                                    <Skeleton variant="text" width={150} sx={{ fontSize: '1rem' }} />
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Visibility fontSize="small" />
                                    <Skeleton variant="text" width={100} sx={{ fontSize: '1rem' }} />
                                </Stack>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <Lists videos={videos.items} format={format} />
            )}
        </div>
    )
};

export default Home;