// store/store.ts

import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/userSlice";
import adminReducer from "./features/adminSlice";
import themeReducer from "./features/themeSlice";
import uiReducer from "./features/uiSlice";

import listingReducer from "./features/listingSlice";
import searchReducer from "./features/searchSlice";
import savedPropertyReducer from "./features/savedPropertySlice";
import ragChatReducer, {
  loadRagChatStateFromStorage,
  saveRagChatStateToStorage,
} from "./features/ragChatSlice";

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
  theme: themeReducer,
  ui: uiReducer,

  listings: listingReducer,
  search: searchReducer,
  savedProperties: savedPropertyReducer,
  ragChat: ragChatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Load persisted RAG chat state only in browser
const persistedRagChat =
  typeof window !== "undefined" ? loadRagChatStateFromStorage() : null;

const preloadedState = persistedRagChat
  ? ({
      ragChat: persistedRagChat,
    } as Partial<RootState>)
  : undefined;

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persist RAG chat slice to localStorage
let ragChatPersistTimer: ReturnType<typeof setTimeout> | null = null;

store.subscribe(() => {
  if (typeof window === "undefined") return;

  if (ragChatPersistTimer) {
    clearTimeout(ragChatPersistTimer);
  }

  ragChatPersistTimer = setTimeout(() => {
    const state = store.getState();
    saveRagChatStateToStorage(state.ragChat);
  }, 200);
});

export type AppDispatch = typeof store.dispatch;