"use client";
import { configureStore } from "@reduxjs/toolkit";
import allReducer from "./slices";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    ...allReducer,
  },
});
// Export the types of the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create a custom hook to use the dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
