import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchVideos = createAsyncThunk('videos/fetchVideos', async () => {
    const { data } = await axios.get('/videos').catch((err) => console.log(err.responce.data.message));
    return data;
});

const initialState = {
    videos: {
        items: [],
        status: 'loading',
    }
};

const videosSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchVideos.pending]: (state) => {
            state.videos.status = 'loading';
        },
        [fetchVideos.fulfilled]: (state, action) => {
            state.videos.items = action.payload;
            state.videos.status = 'loaded';
        },
        [fetchVideos.rejected]: (state) => {
            state.videos.items = [];
            state.videos.status = 'error'
        },
    }
});

export const videosReducer = videosSlice.reducer;