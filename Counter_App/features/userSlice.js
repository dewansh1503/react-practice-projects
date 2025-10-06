import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
   'user/fetchUser',
   async (userid, thunkAPI) => {
      try {
         const user = await fetch(
            `https://jsonplaceholder.typicode.com/users/${userid}`
         );
         return await user.json();
      } catch (err) {
         return thunkAPI.rejectWithValue(err.message);
      }
   }
);

const userSlice = createSlice({
   name: 'user',
   initialState: { user: null, loading: false, error: null },
   extraReducers: (builder) => {
      builder
         .addCase(fetchUser.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.user = null;
         })
         .addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.user = action.payload;
         })
         .addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload;
         });
   },
});

export default userSlice.reducer;
