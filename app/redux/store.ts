"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./features/counter/counter.slice";

export const rootReducer = combineReducers({
  // counter: counterReducer,
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
    // [api.reducerPath]: api.reducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
