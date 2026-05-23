// store/features/listingSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Listing = {
  id: string;
  title?: string;
  address?: string;
  city?: string;
  state?: string;
  price?: number;
  imageUrl?: string | null;
};

type ListingState = {
  listings: Listing[];
  selectedListing: Listing | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: ListingState = {
  listings: [],
  selectedListing: null,
  isLoading: false,
  error: null,
};

const listingSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setListings: (state, action: PayloadAction<Listing[]>) => {
      state.listings = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setSelectedListing: (state, action: PayloadAction<Listing | null>) => {
      state.selectedListing = action.payload;
    },
    setListingsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setListingsError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setListings,
  setSelectedListing,
  setListingsLoading,
  setListingsError,
} = listingSlice.actions;

export default listingSlice.reducer;