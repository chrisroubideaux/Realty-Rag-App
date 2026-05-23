// store/features/adminSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AdminState = {
  admin: unknown | null;
  token: string | null;
  isAuthenticated: boolean;
};

const initialState: AdminState = {
  admin: null,
  token: null,
  isAuthenticated: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminSession: (
      state,
      action: PayloadAction<{ admin: unknown; token: string }>
    ) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    clearAdminSession: (state) => {
      state.admin = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAdminSession, clearAdminSession } = adminSlice.actions;
export default adminSlice.reducer;