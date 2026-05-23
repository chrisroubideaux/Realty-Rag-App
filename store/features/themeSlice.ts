// store/features/themeSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ThemeMode = "light" | "dark" | "luxury";

type ThemeState = {
  mode: ThemeMode;
};

const initialState: ThemeState = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
  },
});

export const { setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;