import { configureStore } from "@reduxjs/toolkit";
import themeReducer from '../features/theme/theme-slice';

export default configureStore({
    reducer: {
        theme: themeReducer,
    },
});