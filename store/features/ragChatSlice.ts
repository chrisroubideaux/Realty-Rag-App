// store/features/ragChatSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type RagMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
};

type RagChatState = {
  messages: RagMessage[];
  isOpen: boolean;
  isLoading: boolean;
};

const initialState: RagChatState = {
  messages: [],
  isOpen: false,
  isLoading: false,
};

const STORAGE_KEY = "realty_rag_chat_state";

export function loadRagChatStateFromStorage(): RagChatState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RagChatState) : null;
  } catch {
    return null;
  }
}

export function saveRagChatStateToStorage(state: RagChatState) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore localStorage errors for now.
  }
}

const ragChatSlice = createSlice({
  name: "ragChat",
  initialState,
  reducers: {
    setRagChatOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setRagChatLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addRagMessage: (state, action: PayloadAction<RagMessage>) => {
      state.messages.push(action.payload);
    },
    clearRagMessages: (state) => {
      state.messages = [];
    },
  },
});

export const {
  setRagChatOpen,
  setRagChatLoading,
  addRagMessage,
  clearRagMessages,
} = ragChatSlice.actions;

export default ragChatSlice.reducer;