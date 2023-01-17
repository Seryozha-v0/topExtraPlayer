import { Typography, Avatar, Stack, Skeleton } from "@mui/material";
import { Visibility } from "@mui/icons-material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchVideos } from "../Redux/slices/videos";
import format from '../libs/format';

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
                        <Stack direction="row" alignItems='center' spacing={1}>
                            <Avatar alt="Remy Sharp" sx={{ width: 22, height: 22 }} src="https://elements-video-cover-images-0.imgix.net/files/d485581a-d38d-497c-b737-8ab4d52fdf75/inline_image_preview.jpg?auto=compress%2Cformat&fit=min&h=225&w=400&s=669dd8d3e0bfeaf096fec1384896f75a" />
                            <Typography variant="subtitle1">{item.author}</Typography>
                        </Stack>
                        <Stack direction="row" alignItems='center' spacing={1}>
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