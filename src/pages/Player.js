import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import '../index.css';
import axios from '../axios';
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Skeleton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../Redux/slices/videos";
import { Visibility } from "@mui/icons-material";
import Controls from '../components/Video/Controls';
import Lists from '../components/Video/Lists';
import format from '../libs/format';
import Episodes from "../components/Video/Episodes";

const Player = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const Navigate = useNavigate();
    const { videos } = useSelector(state => state.videos);


    const [currentVideo, setCurrentVideo] = useState({});
    const [currentLoading, setCurrentLoading] = useState(true);

    const listsLoading = videos.status === 'loading';

    const [nextCounter, setNextCounter] = useState({
        enabled: true,
        isNext: false,
        time: 5,
    });

    const [videoStates, setVideoStates] = useState({
        playing: true,
        muted: true,
        volume: 0.8,
        videoBackRate: 1.0,
        played: 0,
        fullscreen: false,
        buffer: 0,
        timeCodeIndex: 0,
        pip: false
    });
    const [currentTime, setCurrentTime] = useState(0);
    const [controlsShow, setControlsShow] = useState(true);

    const { playing, muted, volume, videoBackRate, buffer, played, playedSeconds } = videoStates;
    const videoRef = useRef(null);

    const currVideoTime = videoRef.current ? videoRef.current.getCurrentTime() : '00';
    const movieDirection = videoRef.current ? videoRef.current.getDuration() : '00';

    const maxDuration = movieDirection * 1000;

    const playedTime = format(currVideoTime);
    const fullMovieTime = format(movieDirection);

    const videoDivRef = useRef(null);
    const controlsTimerRef = useRef(null);
    const nextTimeRef = useRef(null);

    //Menu
    const [anchorMenuEl, setAnchorMenuEl] = useState(null);
    const [anchorSubMenuEl, setAnchorSubMenuEl] = useState(null);
    const openMenu = Boolean(anchorMenuEl);
    const openSubMenu = Boolean(anchorSubMenuEl);

    const handleMenuClick = (e) => {
        setAnchorMenuEl(e.currentTarget);
    };
    const handleSubMenuClick = () => {
        setAnchorSubMenuEl(anchorMenuEl);
        setAnchorMenuEl(null);
    };
    const handleMenuClose = () => {
        setAnchorMenuEl(null);
    };
    const handleSubMenuClose = () => {
        setAnchorSubMenuEl(null);
    };

    const startControlsTimer = () => {
        clearInterval(controlsTimerRef.current);

        controlsTimerRef.current = setTimeout(() => {
            setControlsShow(false);
            setAnchorMenuEl(null);
            setAnchorSubMenuEl(null);
        }, 3000);
    }

    const handlePlayAndPause = () => {
        cancelNextVideo();

        setVideoStates({
            ...videoStates,
            playing: !videoStates.playing,
        })
        if (videoStates.playing) {
            clearTimeout(controlsTimerRef.current);
        } else {
            startControlsTimer();
        }
    }

    const handleControlsShow = (e) => {
        setControlsShow(true);

        if (videoStates.playing) {
            startControlsTimer();
        }
    }

    const handleRewind = () => {
        const currTime = videoRef.current.getCurrentTime();
        videoRef.current.seekTo(currTime - 10, 'seconds');
    }

    const handleFastForward = () => {
        const currTime = videoRef.current.getCurrentTime();
        videoRef.current.seekTo(currTime + 30, 'seconds');
    }

    const handleVideoProgress = (state) => {
        if (!videoStates.seeking) {
            setCurrentTime(state.playedSeconds * 1000);

            if (currentVideo.timeCodes) {
                for (let i = 0; i < currentVideo.timeCodes.length; i++) {
                    const el = currentVideo.timeCodes[i];
                    const nextEl = currentVideo.timeCodes[i + 1];
                    const currentMs = parseFloat(state.playedSeconds * 1000);

                    if (currentMs >= el.fromMs && currentMs < ((i + 1 < currentVideo.timeCodes.length) ? nextEl.fromMs : maxDuration)) {
                        setVideoStates({ ...videoStates, timeCodeIndex: i, buffer: state.loadedSeconds * 1000 });
                        break;
                    }
                }
            } else {
                setVideoStates({ ...videoStates, buffer: state.loadedSeconds * 1000});
            }
        }
    }

    const handleVideoSeek = useCallback((time, offsetTime) => {
        videoRef.current.seekTo(time / 1000);
        setCurrentTime(time);
    }, []);

    const handleVideoSeekTimeCode = (time) => {
        videoRef.current.seekTo(time / 1000);
        setCurrentTime(time);
    }

    const handleMuting = () => {
        setVideoStates({ ...videoStates, muted: !videoStates.muted })
    }

    const handleVolumeChange = (e, value) => {
        setVideoStates({ ...videoStates, volume: parseFloat(value / 100), muted: value === 0 ? true : false });
    }

    const handleVolumeSeek = (e, value) => {
        setVideoStates({ ...videoStates, volume: parseFloat(value / 100), muted: value === 0 ? true : false });
    }

    const handleFullScreenMode = () => {
        setVideoStates({
            ...videoStates,
            fullscreen: !videoStates.fullscreen,
        })
    }

    const handleVideoRate = (rate) => {
        setVideoStates({ ...videoStates, videoBackRate: rate });
        handleSubMenuClose();
    }

    const startNextVideoTimer = () => {
        clearTimeout(controlsTimerRef.current);
        const next = videos.items[0];

        controlsTimerRef.current = setTimeout(() => {
            return Navigate(`/video/${next._id}`);
        }, 5000);
    };

    const cancelNextVideo = () => {
        clearTimeout(controlsTimerRef.current);
        clearInterval(nextTimeRef.current);
        setNextCounter({ ...nextCounter, isNext: false, time: 5 });
    }

    const startNextCancelTimer = () => {
        clearInterval(nextTimeRef.current);

        nextTimeRef.current = setInterval(() => {
            setNextCounter({
                ...nextCounter,
                isNext: true,
                time: --nextCounter.time,
            })
        }, 1000);
    }

    const ended = () => {
        setVideoStates({
            ...videoStates,
            playing: !videoStates.playing,
        });
        clearInterval(controlsTimerRef.current);
        setControlsShow(true);
        if (nextCounter.enabled) {
            startNextVideoTimer();
            startNextCancelTimer();
        }
    }

    const handleNextToggle = () => {
        if (nextCounter.enabled) {
            cancelNextVideo();
            setNextCounter({ ...nextCounter, isNext: false, enabled: !nextCounter.enabled });
        } else {
            setNextCounter({ ...nextCounter, enabled: !nextCounter.enabled });
        }
    }

    const handlePipMode = () => {
        setVideoStates({ ...videoStates, pip: !videoStates.pip });
    }

    useEffect(() => {
        if (!document.pictureInPictureElement) {
            setVideoStates({ ...videoStates, pip: false });
        }
    }, [document.pictureInPictureElement]);

    useEffect(() => {
        if (videoStates.fullscreen) {
            screenfull.request(videoDivRef.current);
        } else {
            screenfull.exit();
        }
    }, [videoStates.fullscreen]);

    useEffect(() => {
        cancelNextVideo();
        setControlsShow(true);
        startControlsTimer();

        const videoId = params.id;

        axios.get(`/videos/${videoId}`).then((res) => {
            setCurrentVideo(res.data);
            setCurrentLoading(false);
            setVideoStates({
                ...videoStates,
                playing: true,
            });
        }).catch((err) => {
            console.log(err);
        });

        dispatch(fetchVideos(videoId));
    }, [params]);

    return (
        <div className="video">
            <div className="video__wrap">
                <div className="video__player-wrap" ref={videoDivRef} onMouseMove={handleControlsShow}>
                    {currentLoading ? (
                        <>
                            <Skeleton variant="rectangular" width={'100%'} height={450} />
                        </>
                    ) : (
                        <>
                            <ReactPlayer
                                width={'100%'}
                                height='100%'
                                url={currentVideo.videoSrc}
                                ref={videoRef}
                                className='video__player'
                                controls={false}
                                playing={playing}
                                muted={muted}
                                pip={videoStates.pip}
                                onProgress={handleVideoProgress}
                                playbackRate={videoBackRate}
                                onEnded={ended}
                            />
                            <Controls
                                conteinerRef={videoDivRef.current}
                                controlsShow={controlsShow}
                                maxDuration={maxDuration}
                                playing={videoStates.playing}
                                played={playedSeconds}
                                playedTime={playedTime}
                                currentTime={currentTime}
                                buffer={buffer}
                                fullMovieTime={fullMovieTime}
                                muted={muted}
                                volume={volume}
                                videoBackRate={videoBackRate}
                                pip={videoStates.pip}
                                nextEnabled={nextCounter.enabled}
                                isNext={nextCounter.isNext}
                                nextTime={nextCounter.time}
                                nextVideo={videos.items[0]}
                                anchorMenuEl={anchorMenuEl}
                                anchorSubMenuEl={anchorSubMenuEl}
                                openMenu={openMenu}
                                openSubMenu={openSubMenu}
                                isFullscreen={videoStates.fullscreen}
                                timeCodes={currentVideo.timeCodes}
                                playAndPause={handlePlayAndPause}
                                rewind={handleRewind}
                                fastForward={handleFastForward}
                                onSeek={handleVideoSeek}
                                muting={handleMuting}
                                volumeChange={handleVolumeChange}
                                volumeSeek={handleVolumeSeek}
                                videoRate={handleVideoRate}
                                pipClick={handlePipMode}
                                fullScreenMode={handleFullScreenMode}
                                cancelNext={cancelNextVideo}
                                menuClick={handleMenuClick}
                                subMenuClick={handleSubMenuClick}
                                menuClose={handleMenuClose}
                                subMenuClose={handleSubMenuClose}
                                nextEnabledToggle={handleNextToggle}
                            />
                        </>
                    )}
                </div>
                <div className="video-list__desc">
                    {currentLoading ? (
                        <>
                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Stack direction="row" alignItems='center' spacing={1}>
                                    <Skeleton variant="circular" width={26} height={26} />
                                    <Skeleton variant="text" width={150} sx={{ fontSize: '2rem' }} />
                                </Stack>
                                <Stack direction="row" alignItems='center' spacing={1}>
                                    <Visibility fontSize="small" />
                                    <Skeleton variant="text" width={100} sx={{ fontSize: '1rem' }} />
                                </Stack>
                            </Stack>
                        </>
                    ) : (
                        <>
                            <Typography variant="h4">{currentVideo.title}</Typography>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Stack direction="row" alignItems='center' spacing={1}>
                                    <Avatar alt="Remy Sharp" sx={{ width: 26, height: 26 }} src="https://elements-video-cover-images-0.imgix.net/files/d485581a-d38d-497c-b737-8ab4d52fdf75/inline_image_preview.jpg?auto=compress%2Cformat&fit=min&h=225&w=400&s=669dd8d3e0bfeaf096fec1384896f75a" />
                                    <Typography variant="subtitle1">{currentVideo.author}</Typography>
                                </Stack>
                                <Stack direction="row" alignItems='center' spacing={1}>
                                    <Visibility fontSize="small" />
                                    <Typography variant="body1">{currentVideo.watchedCount} просмотров</Typography>
                                </Stack>
                            </Stack>
                        </>
                    )}
                </div>
            </div>
            <div className="videos__lists">
                {listsLoading ? (
                    <>
                        {[1, 2, 3, 4, 5].map((item, i) => (
                            <div
                                key={i}
                                className="video-list__item"
                            >
                                <div className="video-list__img">
                                    <Skeleton variant="rounded" width={'100%'} height={88} />
                                </div>
                                <div className="video-list__desc">
                                    <Skeleton variant="text" width={100} sx={{ fontSize: '2rem' }} />
                                    <Skeleton variant="text" width={100} sx={{ fontSize: '1rem' }} />
                                    <Skeleton variant="text" width={100} sx={{ fontSize: '1rem' }} />
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        {currentVideo.timeCodes ? (
                            <Episodes
                                episodes={currentVideo.timeCodes}
                                timeCodeIndex={videoStates.timeCodeIndex}
                                seekTo={handleVideoSeekTimeCode}
                            />
                        ) : ('')}
                        <Lists
                            videos={videos.items}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default Player;