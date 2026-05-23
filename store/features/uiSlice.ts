// store/features/uiSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  isMobileMenuOpen: boolean;
  isSearchPanelOpen: boolean;
  isRagChatOpen: boolean;
  activeModal: string | null;
};

const initialState: UiState = {
  isMobileMenuOpen: false,
  isSearchPanelOpen: false,
  isRagChatOpen: false,
  activeModal: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    setSearchPanelOpen: (state, action: PayloadAction<boolean>) => {
      state.isSearchPanelOpen = action.payload;
    },
    setRagChatOpen: (state, action: PayloadAction<boolean>) => {
      state.isRagChatOpen = action.payload;
    },
    setActiveModal: (state, action: PayloadAction<string | null>) => {
      state.activeModal = action.payload;
    },
  },
});

export const {
  setMobileMenuOpen,
  setSearchPanelOpen,
  setRagChatOpen,
  setActiveModal,
} = uiSlice.actions;

export default uiSlice.reducer;