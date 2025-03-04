import { createSlice } from "@reduxjs/toolkit";

const applyTheme = (isDark) => {
    if (isDark) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('bg-base-100', 'text-white');
        document.body.classList.remove('bg-white', 'text-gray-900');
    } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.add('bg-white', 'text-gray-900');
        document.body.classList.remove('bg-base-100', 'text-white');
    }
};

export const themeSlice = createSlice({
    name: "theme",
    initialState: {
        isDarkMode: localStorage.getItem('isDarkMode') === 'true',
    },
    reducers: {
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem('isDarkMode', state.isDarkMode.toString());
            applyTheme(state.isDarkMode);
        },
        setDarkMode: (state) => {
            state.isDarkMode = true;
            localStorage.setItem('isDarkMode', 'true');
            applyTheme(true);
        },
        setLightMode: (state) => {
            state.isDarkMode = false;
            localStorage.setItem('isDarkMode', 'false');
            applyTheme(false);
        },
    },
});

applyTheme(localStorage.getItem('isDarkMode') === 'true');

export const { toggleTheme, setDarkMode, setLightMode } = themeSlice.actions;
export default themeSlice.reducer;
