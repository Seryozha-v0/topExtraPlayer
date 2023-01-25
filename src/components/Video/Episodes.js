import { List, ListItemButton, ListItemText, ListSubheader, Typography } from "@mui/material";
import React from "react";
import format from "../../libs/format";

const Episodes = ({ episodes, timeCodeIndex, seekTo }) => {
    return (
        <>
            <Typography variant="h6">Эпизоды</Typography>
            <List
                component="nav"
                aria-label="secondary mailbox folder"
                sx={{
                    maxHeight: 120,
                    position: 'relative',
                    overflow: 'auto',
                    '& ul': { padding: 0 },
                }}
            >
                {episodes.map((episode, i) => (
                    <>
                        <ListItemButton
                            key={i}
                            selected={i === timeCodeIndex}
                            autoFocus={i === timeCodeIndex}
                            onClick={() => seekTo(episode.fromMs)}
                        >
                            <ListItemText primary={`${format(episode.fromMs / 1000)} | ${episode.description}`} />
                        </ListItemButton>
                    </>
                ))}
            </List>
        </>
    )
}

export default Episodes;