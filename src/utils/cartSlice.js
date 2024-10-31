import { createSlice, current } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
        // mutating the state here => In redux toolkit we have to mutate the state
        // Redux toolkit uses immer to abstract the data as we like to do in older redux
        state.items.push(action.payload);

        // vanilla(Old Redux) Don't mutate state at all and returning is mandatory.

        // In Redux we used to do like below
      // const newState = {...state};
      // newState.items.push(action.payload);
      // return newState;

    },
    removeItem: (state) => {
      state.items.pop();
    },
    // Original State = {items: ["pizza"]}
    clearCart: (state) => {
      // console.log(state) // {items: ["pizza"]}
      console.log('current state', current(state)); // This console will work here.
      // state = [] // This changes only local variable but pizza remains the same so it won't work.
      // console.log(state) // []

      // RTK - Either mutate the existing state or return a new state
      state.items.length = 0; // state = [] or return {items: []}; this new object will be replaced inside originalState = {items: []}
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
