// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import todoReducer, { TodoState } from './todoSlice';

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export type RootState = {
  todo: TodoState;
};

export type AppDispatch = typeof store.dispatch;
export default store;
