import { configureStore } from '@reduxjs/toolkit';
import { cartReducer, itemsReducer, wishlistReducer } from './slices.js';

const store = configureStore({
   reducer: {
      items: itemsReducer,
      wishlist: wishlistReducer,
      cart: cartReducer,
   },
});
export default store;
