// store/features/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  user: unknown | null;
  token: string | null;
  isAuthenticated: boolean;
};

const initialState: UserState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserSession: (
      state,
      action: PayloadAction<{ user: unknown; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    clearUserSession: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUserSession, clearUserSession } = userSlice.actions;
export default userSlice.reducer;