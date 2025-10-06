import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice.js';
import userReducer from '../features/userSlice.js';

export const store = configureStore({
   reducer: { count: counterReducer, user: userReducer },
});
