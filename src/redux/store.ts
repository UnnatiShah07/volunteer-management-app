import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { volunteerSlice } from "./volunteerSlice";
import { eventSlice } from "./eventSlice";

export const store = configureStore({
  reducer: {
    volunteer: volunteerSlice.reducer,
    events: eventSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
