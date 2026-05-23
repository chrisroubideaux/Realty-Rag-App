// store/features/searchSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SearchState = {
  query: string;
  city: string;
  propertyType: string;
  minPrice: string;
  maxPrice: string;
};

const initialState: SearchState = {
  query: "",
  city: "",
  propertyType: "",
  minPrice: "",
  maxPrice: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchState: (state, action: PayloadAction<Partial<SearchState>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetSearchState: () => initialState,
  },
});

export const { setSearchState, resetSearchState } = searchSlice.actions;
export default searchSlice.reducer;