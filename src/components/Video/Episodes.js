import { List, ListItemButton, ListItemText, ListSubheader } from "@mui/material";
import React from "react";
import format from "../../libs/format";

const Episodes = ({ episodes, timeCodeIndex, seekTo }) => {
    return (
        <List
            component="nav"
            aria-label="secondary mailbox folder"
            sx={{
                maxHeight: 150,
                position: 'relative',
                overflow: 'auto',
                '& ul': { padding: 0 },
            }}
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Эпизоды
                </ListSubheader>
            }
        >
            {episodes.map((episode, i) => (
                <>
                    <ListItemButton
                        key={i}
                        selected={i === timeCodeIndex}
                        // autoFocus={i === timeCodeIndex}
                        onClick={() => seekTo(episode.fromMs)}
                    >
                        <ListItemText primary={`${format(episode.fromMs / 1000)} | ${episode.description}`} />
                    </ListItemButton>
                </>
            ))}
        </List>
    )
}

export default Episodes;