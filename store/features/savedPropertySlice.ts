// store/features/savedPropertySlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Listing } from "./listingSlice";

type SavedPropertyState = {
  savedProperties: Listing[];
};

const initialState: SavedPropertyState = {
  savedProperties: [],
};

const savedPropertySlice = createSlice({
  name: "savedProperties",
  initialState,
  reducers: {
    setSavedProperties: (state, action: PayloadAction<Listing[]>) => {
      state.savedProperties = action.payload;
    },
    clearSavedProperties: (state) => {
      state.savedProperties = [];
    },
  },
});

export const { setSavedProperties, clearSavedProperties } =
  savedPropertySlice.actions;

export default savedPropertySlice.reducer;