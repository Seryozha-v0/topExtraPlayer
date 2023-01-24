import React from "react";
import { Grid, Typography, IconButton, Button, Slider, styled, SpeedDial, Popover, Menu, List, ListSubheader, ListItem, ListItemText, Switch, ListItemButton } from "@mui/material";
import { FastForwardSharp, FastRewind, PlayArrowSharp, PauseSharp, VolumeUp, Fullscreen, VolumeOff, FullscreenExit, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";

import "react-video-seek-slider/styles.css";
import { VideoSeekSlider } from "react-video-seek-slider";

const controls = ({
    conteinerRef,
    controlsShow,
    playing,
    playAndPause,
    rewind,
    fastForward,
    played,
    onSeek,
    playedTime,
    fullMovieTime,
    muted,
    muting,
    volume,
    volumeChange,
    volumeSeek,
    videoRate,
    videoBackRate,
    fullScreenMode,
    nextEnabled,
    isNext,
    nextTime,
    cancelNext,
    nextVideo,
    anchorMenuEl,
    anchorSubMenuEl,
    openMenu,
    openSubMenu,
    menuClick,
    subMenuClick,
    menuClose,
    subMenuClose,
    nextEnabledToggle,
    isFullscreen,
    maxDuration,
    timeCodes,
    buffer
}) => {

    return (
        <div className={`video__controls ${controlsShow ? "video__controls_active" : ""}`}>
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


                {isNext ? (
                    <Grid
                        container
                        direction='column'
                        alignContent='center'
                        alignItems='felc-start'
                        justifyContent='center'
                    >
                        <div>Воспроизведение через {nextTime}...</div>
                        <div
                            className="video-list__item video-list_next"
                        >
                            <div className="video-list__img">
                                <img src={nextVideo.imageUrl} />
                            </div>
                            <div className="video-list__desc">
                                <Typography variant="h6">{nextVideo.title}</Typography>
                                <Typography variant="subtitle1">{nextVideo.author}</Typography>
                            </div>
                        </div>
                        <Grid item>
                            <Grid container>
                                <Button variant="outlined" className="video-list_next-btn" onClick={cancelNext}>Отмена</Button>
                                <Button variant="contained" className="video-list_next-btn"><Link to={`/video/${nextVideo._id}`}>Воспроизвести</Link></Button>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : (
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
                )}

                <Grid
                    container
                    direction='row'
                    alignContent='flex-end'
                    alignItems='center'
                    justifyContent='space-between'
                    style={{ padding: 2 }}
                >
                    <Grid item xs={12} style={{ marginBottom: 25 }}>
                        <VideoSeekSlider
                            max={maxDuration}
                            currentTime={played}
                            bufferTime={buffer}
                            onChange={onSeek}
                            secondsPrefix="00:"
                            timeCodes={timeCodes}
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
                                    <PauseSharp fontSize="medium" style={{ color: '#fff' }} />
                                ) : (
                                    <PlayArrowSharp fontSize="medium" style={{ color: '#fff' }} />
                                )}
                            </IconButton>

                            <Grid item>
                                <Grid
                                    container
                                    alignItems='center'
                                    style={{ minWidth: 100 }}
                                >
                                    <Grid item>
                                        <IconButton className="video__icons" aria-label="reqind" onClick={muting}>
                                            {muted ? (
                                                <VolumeOff fontSize="medium" style={{ color: '#fff' }} />
                                            ) : (
                                                <VolumeUp fontSize="medium" style={{ color: '#fff' }} />
                                            )}
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs>
                                        <Slider
                                            min={0}
                                            max={100}
                                            value={volume * 100}
                                            step={10}
                                            size="small"
                                            valueLabelDisplay="auto"
                                            className='video__slider'
                                            onChange={volumeChange}
                                            onChangeCommitted={volumeSeek}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item ml={2}>
                                <Typography variant="caption" style={{ color: 'white' }} >
                                    {playedTime}
                                </Typography>
                                /
                                <Typography variant="caption" style={{ color: 'white' }} >
                                    {fullMovieTime}
                                </Typography>
                            </Grid>

                        </Grid>
                    </Grid>

                    <Grid item>
                        <IconButton className="video__bottom-icons" aria-label="reqind" onClick={menuClick}>
                            <Settings />
                        </IconButton>
                        <Menu
                            container={conteinerRef}
                            anchorEl={anchorMenuEl}
                            open={openMenu}
                            onClose={menuClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                        >
                            <List
                                sx={{ width: 280 }}
                                dense={true}
                            >
                                <ListItem>
                                    <ListItemButton onClick={nextEnabledToggle}>
                                        <ListItemText primary="Автовоспроизведение" />
                                        <Switch
                                            edge="end"
                                            size="small"
                                            checked={nextEnabled}
                                        />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem
                                    secondaryAction={
                                        <ListItemButton onClick={subMenuClick}>
                                            <ListItemText primary={`${videoBackRate}x`} />
                                        </ListItemButton>
                                    }
                                >
                                    <ListItemButton onClick={subMenuClick}>
                                        <ListItemText primary="Скорость" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Menu>
                        <Menu
                            container={conteinerRef}
                            anchorEl={anchorSubMenuEl}
                            open={openSubMenu}
                            onClose={subMenuClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                        >
                            <List
                                sx={{ width: 280 }}
                                subheader={<ListSubheader>Скорость</ListSubheader>}
                                dense={true}
                            >
                                {
                                    [0.5, 1, 1.25, 1.5, 2].map((rate) => (
                                        <ListItemButton
                                            key={rate}
                                            variant="text"
                                            onClick={() => videoRate(rate)}
                                            selected={rate === videoBackRate}
                                        >
                                            <Typography color={rate === videoBackRate ? 'secondary' : 'default'}>{rate}x</Typography>
                                        </ListItemButton>
                                    ))
                                }
                            </List>
                        </Menu>

                        <IconButton className="video__bottom-icons" onClick={fullScreenMode}>
                            {isFullscreen ? (
                                <FullscreenExit fontSize="medium" />
                            ) : (
                                <Fullscreen fontSize="medium" />
                            )}
                        </IconButton>
                    </Grid>
                </Grid>

            </Grid>
        </div>
    )
}

export default controls;