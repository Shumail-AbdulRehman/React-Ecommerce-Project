import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        item =>
          item.id === newItem.id &&
          item.color === newItem.color &&
          item.sizes === newItem.sizes
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          color: newItem.color,
          sizes: newItem.sizes, // ✅ consistent
          quantity: 1,
          totalPrice: newItem.price,
        });
      }

      state.totalQuantity++;
      state.totalPrice += newItem.price;
    },

    removeItem: (state, action) => {
      const { id, color, sizes } = action.payload;
      const existingItem = state.items.find(
        item =>
          item.id === id && item.color === color && item.sizes === sizes
      );

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;

        state.items = state.items.filter(
          item => !(item.id === id && item.color === color && item.sizes === sizes)
        );
      }
    },

    increaseQuantity: (state, action) => {
      const { id, color, sizes } = action.payload;
      const item = state.items.find(
        item => item.id === id && item.color === color && item.sizes === sizes
      );

      if (item) {
        item.quantity++;
        item.totalPrice += item.price;
        state.totalQuantity++;
        state.totalPrice += item.price;
      }
    },

    decreaseQuantity: (state, action) => {
      const { id, color, sizes } = action.payload;
      const item = state.items.find(
        item => item.id === id && item.color === color && item.sizes === sizes
      );

      if (item) {
        item.quantity--;
        item.totalPrice -= item.price;
        state.totalQuantity--;
        state.totalPrice -= item.price;

        if (item.quantity === 0) {
          state.items = state.items.filter(
            i => !(i.id === id && i.color === color && i.sizes === sizes)
          );
        }
      }
    },
  },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
