import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './countSlice'; // Assume that countSlice.ts is in the same directory

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
