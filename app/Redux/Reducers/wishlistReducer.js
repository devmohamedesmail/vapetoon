import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {
    add_To_wishlist: (state, action) => {
      const itemToAdd = action.payload;
      const isItemAlreadyInWishlist = state.items.some(
        (item) => item.id === itemToAdd.id
      );
      if (!isItemAlreadyInWishlist) {
        state.items.push(itemToAdd);
      }
    },
    remove_From_wishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { add_To_wishlist, remove_From_wishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
