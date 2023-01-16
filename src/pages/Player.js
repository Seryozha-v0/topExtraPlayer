import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import '../index.css';
import videos from '../videos';

import Controls from '../components/Video/Controls';
import Lists from '../components/Video/Lists';
import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
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

const Player = () => {
    const dispatch = useDispatch();
    // const { videos } = useSelector(state => state.videos);

    const params = useParams();
    const Navigate = useNavigate();
    const [playerStates, setPlayerStates] = useState({
        current: {},
        list: {},
        isLoading: true,
    });
    const [nextCounter, setNextCounter] = useState({
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
    });
    const [controlsShow, setControlsShow] = useState(true);

    const { playing, muted, volume, videoBackRate, played } = videoStates;
    const videoRef = useRef(null);

    const currVideoTime = videoRef.current ? videoRef.current.getCurrentTime() : '00:00';
    const movieDirection = videoRef.current ? videoRef.current.getDuration() : '00:00';

    const playedTime = format(currVideoTime);
    const fullMovieTime = format(movieDirection);

    const videoDivRef = useRef(null);
    const controlsTimerRef = useRef(null);
    const nextTimeRef = useRef(null);

    //Popover
    const [anchorEl, setAnchorEl] = useState(null);
    const handlePopClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handlePopClose = () => {
        setAnchorEl(null);
    };
    const popOpen = Boolean(anchorEl);
    const popId = popOpen ? 'simple-popover' : undefined;


    const startControlsTimer = () => {
        clearInterval(controlsTimerRef.current);

        controlsTimerRef.current = setTimeout(() => {
            setControlsShow(false);
            handlePopClose();
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
            setVideoStates({ ...videoStates, ...state })
        }
    }

    const handleVideoSeek = (value) => {
        setVideoStates({ ...videoStates, played: parseFloat(value.target.value / 100) });
        videoRef.current.seekTo(parseFloat(value.target.value / 100));
    }

    const handleVideoMouseSeekUp = (value) => {
        setVideoStates({ ...videoStates, seeking: false });
        videoRef.current.seekTo(value / 100);
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
        handlePopClose();
    }

    const startNextVideoTimer = () => {
        clearTimeout(controlsTimerRef.current);
        const next = playerStates.list[0];

        controlsTimerRef.current = setTimeout(() => {
            return Navigate(`/video/${next._id}`);
        }, 5000);
    };

    const cancelNextVideo = () => {
        clearTimeout(controlsTimerRef.current);
        clearInterval(nextTimeRef.current);
        setNextCounter({ isNext: false, time: 5 });
    }

    const startNextCancelTimer = () => {
        clearInterval(nextTimeRef.current);

        nextTimeRef.current = setInterval(() => {
            setNextCounter({
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
        startNextVideoTimer();
        startNextCancelTimer();
    }

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
        const currIndex = videos.findIndex((el) => el._id == videoId);
        const list = [];

        for (let i = 0; i < videos.length; i++) {
            const element = videos[i];
            if (i === currIndex) {
                continue;
            }
            list.push(videos[i]);
        }

        setPlayerStates({
            current: videos[currIndex],
            list: list.sort(() => Math.random() - 0.3),
            isLoading: false,
        });
        setVideoStates({
            ...videoStates,
            playing: true,
        });
    }, [params]);

    return (
        <div className="video">
            <div className="video__wrap">
                <div className="video__player-wrap" ref={videoDivRef} onMouseMove={handleControlsShow}>
                    {playerStates.isLoading ? 'loading...' : (
                        <>
                            <ReactPlayer
                                width={'100%'}
                                height='100%'
                                url={playerStates.current.videoSrc}
                                ref={videoRef}
                                className='video__player'
                                controls={false}
                                playing={playing}
                                muted={muted}
                                onProgress={handleVideoProgress}
                                playbackRate={videoBackRate}
                                onEnded={ended}
                            />
                            <Controls
                                controlsShow={controlsShow}
                                playing={videoStates.playing}
                                played={played}
                                playedTime={playedTime}
                                fullMovieTime={fullMovieTime}
                                muted={muted}
                                volume={volume}
                                videoBackRate={videoBackRate}
                                anchorEl={anchorEl}
                                id={popId}
                                popOpen={popOpen}
                                isNext={nextCounter.isNext}
                                nextTime={nextCounter.time}
                                nextVideo={playerStates.list[0]}
                                playAndPause={handlePlayAndPause}
                                rewind={handleRewind}
                                fastForward={handleFastForward}
                                onSeek={handleVideoSeek}
                                onMouseSeekUp={handleVideoMouseSeekUp}
                                muting={handleMuting}
                                volumeChange={handleVolumeChange}
                                volumeSeek={handleVolumeSeek}
                                videoRate={handleVideoRate}
                                popClick={handlePopClick}
                                popClose={handlePopClose}
                                fullScreenMode={handleFullScreenMode}
                                cancelNext={cancelNextVideo}
                            />
                        </>
                    )}
                </div>
                <div className="video__descr">
                    <Typography variant={'h4'}>{playerStates.current.title}</Typography>
                    <Typography variant={'subtitle1'}>{playerStates.current.author}</Typography>
                </div>
            </div>
            <div className="videos__lists">
                {playerStates.isLoading ? 'loading...' : (
                    <Lists
                        videos={playerStates.list}
                    />
                )}
            </div>
        </div>
    );
}

export default Player;