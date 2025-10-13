import { configureStore } from '@reduxjs/toolkit';
import { itemsReducer, wishlistReducer } from './slices.js';

const store = configureStore({
   reducer: {
      items: itemsReducer,
      wishlist: wishlistReducer,
   },
});
export default store;
