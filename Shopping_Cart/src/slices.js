import { createSlice, nanoid } from '@reduxjs/toolkit';

const itemSlice = createSlice({
   name: 'itemSlice',
   initialState: [
      {
         id: nanoid(),
         imageId: 237,
         price: 6000,
         title: 'Dogesh Bhai',
         description: 'New dog to get hands on. Get yours now!!',
      },
      {
         id: nanoid(),
         imageId: 84,
         price: 2000,
         title: 'Bridge',
         description: 'Kr do chadai',
      },
      {
         id: nanoid(),
         price: 1000,
         imageId: 96,
         title: 'Controller',
         description: ' Game khelna hai ? Get yours now!!',
      },
      {
         id: nanoid(),
         price: 3000,
         imageId: 158,
         title: 'Concert tickets',
         description: 'Coldplay ki tickets Get yours now!!',
      },
   ],
});

const wishlistSlice = createSlice({
   name: 'wishlistSlice',
   initialState: [],
   reducers: {
      addToWishlist: (state, action) => {
         state.unshift(action.payload);
      },
      removeFromWishlist: (state, action) => {
         return state.filter((item) => item.id !== action.payload);
      },
   },
});

const cartSlice = createSlice({
   name: 'cartSlice',
   initialState: [],
   reducers: {
      addToCart: (state, action) => {
         state.push({ ...action.payload, quantity: 1 });
      },
      removeFromCart: (state, action) => {
         return state.filter((item) => item.id !== action.payload);
      },
   },
});

export const itemsReducer = itemSlice.reducer;

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;

export const cartReducer = cartSlice.reducer;
export const { addToCart, increaseQunatity, decreaseQuantity, removeFromCart } =
   cartSlice.actions;
