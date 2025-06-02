import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add_to_cart: (state, action) => {
      const product = state.products.find(item => item.id === action.payload.id)
      if (!product) {
        state.products.push({
          ...action.payload,
          quantity: 1
        });
      }
    },
    remove_from_cart: (state, action) => {
      state.products = state.products.filter(item => item.id !== action.payload);
    },
    increase_quantity: (state, action) => {
      const product = state.products.find(item => item.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    decrease_quantity: (state, action) => {
      const product = state.products.find(item => item.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { add_to_cart, remove_from_cart, increase_quantity, decrease_quantity } = cartSlice.actions;

export default cartSlice.reducer;
