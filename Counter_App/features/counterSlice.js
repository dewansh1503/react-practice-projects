import { createSlice } from '@reduxjs/toolkit';

function increment(state, action) {
   state.count += 2;
}
function decrement(state, action) {
   state.count -= 1;
}

const countSlice = createSlice({
   name: 'count',
   initialState: { count: 0 },
   reducers: {
      increase: increment,
      decrease: decrement,
   },
});

export const { increase, decrease } = countSlice.actions;
export default countSlice.reducer;
