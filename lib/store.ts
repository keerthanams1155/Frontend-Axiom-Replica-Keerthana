import { configureStore } from "@reduxjs/toolkit";
import tokenTableReducer from "./store/slices/tokenTableSlice";

export const store = configureStore({
  reducer: {
    tokenTable: tokenTableReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["tokenTable/updatePrice"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

