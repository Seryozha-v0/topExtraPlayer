import { configureStore } from "@reduxjs/toolkit";
import { videosReducer } from "./slices/videos";

const store = configureStore({
    reducer: {
        videos: videosReducer,
    }
});

export default store;