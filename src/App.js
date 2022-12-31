import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import './index.css';
// import videos from './videos';

import Controls from './components/Video/Controls';

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

function App() {
  const [videoStates, setVideoStates] = useState({
    playing: true,
    muted: true,
    volume: 0.5,
    videoBackRate: 1.0,
    played: 0,
    seeking: false,
  });
  const [controlsShow, setControlsShow] = useState(false);

  const { playing, muted, volume, videoBackRate, played, seeking } = videoStates;
  const videoRef = useRef(null);

  const currVideoTime = videoRef.current ? videoRef.current.getCurrentTime() : '00:00';
  const movieDirection = videoRef.current ? videoRef.current.getDuration() : '00:00';

  const playedTime = format(currVideoTime);
  const fullMovieTime = format(movieDirection);

  const videoDivRef = useRef(null);
  const controlsTimerRef = useRef(null);

  const startControlsTimer = () => {
    clearInterval(controlsTimerRef.current);

    controlsTimerRef.current = setTimeout(() => {
      setControlsShow(false);
    }, 3000);
  }

  const handlePlayAndPause = () => {
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

  const handleVideoRate = (rate) => {
    setVideoStates({ ...videoStates, videoBackRate: rate });
  }

  const handleFullScreenMode = () => {
    screenfull.toggle(videoDivRef.current);
  }

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

  return (
    <div className="video">
      <div className="video__wrap" ref={videoDivRef} onMouseMove={handleControlsShow}>
        <ReactPlayer
          width={'100%'}
          height='100%'
          url={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'}
          ref={videoRef}
          className='video__player'
          controls={false}
          playing={playing}
          muted={muted}
          onProgress={handleVideoProgress}
          playbackRate={videoBackRate}
          onEnded={() => console.log('end')}
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
        />
      </div>
    </div>
  );
}

export default App;
