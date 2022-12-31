import React from "react";
import { Grid, Typography, IconButton, Button, Slider, styled, SpeedDial, Popover } from "@mui/material";
import { FastForwardSharp, FastRewind, PlayArrowSharp, PauseSharp, VolumeUp, Fullscreen, VolumeOff } from "@mui/icons-material";

const controls = ({
    controlsShow,
    playing,
    playAndPause,
    rewind,
    fastForward,
    played,
    onSeek,
    onMouseSeekUp,
    playedTime,
    fullMovieTime,
    muted,
    muting,
    volume,
    volumeChange,
    volumeSeek,
    videoRate,
    videoBackRate,
    popClick,
    popClose,
    anchorEl,
    id,
    popOpen,
    fullScreenMode,
}) => {
    const PrettoSlider = styled(Slider)({
        height: 5,
        '& .MuiSlider-track': {
            border: 'none',
        },
        '& .MuiSlider-thumb': {
            height: 16,
            width: 16,
            backgroundColor: '#fff',
            border: '2px solid currentColor',
            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                boxShadow: 'inherit',
            },
            '&:before': {
                dsiplay: 'none',
            },
        },
        '& .MuiSlider-valueLabel': {
            lineHeight: 1.2,
            fontSize: 12,
            background: 'unset',
            padding: 0,
            width: 32,
            height: 32,
            borderRadius: '50% 50% 50% 0',
            backgroundColor: 'blue',
            transformOrigin: 'bottom left',
            transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
            '&:before': { display: 'none' },
            '&.MuiSlider-valueLabelOpen': {
                transform: 'Translate(50%, -100%) rotate(-45deg) scale(1)',
            },
            '& > *': {
                transform: 'rotate(45deg)',
            },
        },
    });

    return (
        <div className={controlsShow ? "video__controls video__controls_active" : "video__controls"}>
            <Grid
                container
                direction='row'
                alignItems='stretch'
                justifyContent='start'
                height='100%'
                style={{ padding: 2 }}
            >
                <Grid item>
                    <Typography variant="h5" style={{ color: '#fff' }} >
                        Title
                    </Typography>
                </Grid>

                <Grid
                    container
                    direction='row'
                    alignItems='center'
                    justifyContent='center'
                >
                    <IconButton className="video__icons" aria-label="reqind" onClick={rewind} >
                        <FastRewind fontSize="large" style={{ color: '#fff' }} />
                    </IconButton>

                    <IconButton className="video__icons" aria-label="reqind" onClick={playAndPause} >
                        {playing ? (
                            <PauseSharp fontSize="large" style={{ color: '#fff' }} />
                        ) : (
                            <PlayArrowSharp fontSize="large" style={{ color: '#fff' }} />
                        )}
                    </IconButton>

                    <IconButton className="video__icons" aria-label="reqind" onClick={fastForward} >
                        <FastForwardSharp fontSize="large" style={{ color: '#fff' }} />
                    </IconButton>
                </Grid>

                <Grid
                    container
                    direction='row'
                    alignItems='end'
                    justifyContent='space-between'
                    style={{ padding: 2 }}
                >
                    <Grid item xs={12}>
                        <Grid
                            container
                            direction='row'
                            justifyContent='space-between'
                        >
                            <Typography variant="h7" style={{ color: 'white' }} >
                                {playedTime}
                            </Typography>

                            <Typography variant="h7" style={{ color: 'white' }} >
                                {fullMovieTime}
                            </Typography>
                        </Grid>

                        <PrettoSlider
                            min={0}
                            max={100}
                            value={played * 100}
                            onChange={onSeek}
                            onChangeCommitted={onMouseSeekUp}
                        />
                    </Grid>

                    <Grid item>
                        <Grid
                            container
                            alignItems='center'
                            direction='row'
                        >
                            <IconButton className="video__icons" aria-label="reqind" onClick={playAndPause}>
                                {playing ? (
                                    <PauseSharp fontSize="large" style={{ color: '#fff' }} />
                                ) : (
                                    <PlayArrowSharp fontSize="large" style={{ color: '#fff' }} />
                                )}
                            </IconButton>

                            <IconButton className="video__icons" aria-label="reqind" onClick={muting}>
                                {muted ? (
                                    <VolumeOff fontSize="large" style={{ color: '#fff' }} />
                                ) : (
                                    <VolumeUp fontSize="large" style={{ color: '#fff' }} />
                                )}
                            </IconButton>

                            <Typography style={{ color: '#fff', paddingTop: '5px' }}>{volume * 100}</Typography>
                            <Slider
                                min={0}
                                max={100}
                                value={volume * 100}
                                step={10}
                                className='video__slider'
                                onChange={volumeChange}
                                onChangeCommitted={volumeSeek}
                            />
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Button variant="text" className="video__bottom-icons" onClick={popClick}>
                            <Typography>{videoBackRate}x</Typography>
                        </Button>
                        <Popover
                            id={id}
                            open={popOpen}
                            anchorEl={anchorEl}
                            onClose={popClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <Grid container direction='column-reverse'>
                                {
                                    [0.5, 1, 1.25, 1.5, 2].map((rate) => (
                                        <Button key={rate} variant="text" className="video__bottom-icons" onClick={() => videoRate(rate)}>
                                            <Typography color={rate === videoBackRate ? 'secondary' : 'default'}>{rate}x</Typography>
                                        </Button>
                                    ))
                                }
                            </Grid>
                        </Popover>

                        <IconButton className="video__bottom-icons" onClick={fullScreenMode}>
                            <Fullscreen fontSize="large" />
                        </IconButton>
                    </Grid>
                </Grid>

            </Grid>
        </div>
    )
}

export default controls;