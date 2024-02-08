import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const handelSlice = createSlice({
  name: "Cart",
  initialState,

  reducers: {
    AddItem(state, action) {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      const updatedItems = [...state.items];

      if (existingCartItemIndex > -1) {
        const existingItem = state.items[existingCartItemIndex];
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems.push({ ...action.payload, quantity: 1 });
      }

      return { ...state, items: updatedItems };
    },

    RemoveItem(state, action) {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      const existingCartItem = state.items[existingCartItemIndex];

      const updatedItems = [...state.items];

      if (existingCartItem.quantity === 1) {
        updatedItems.splice(existingCartItemIndex, 1);
      } else {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return { ...state, items: updatedItems };
    },
  },
});

export const { AddItem, RemoveItem } = handelSlice.actions;

export default handelSlice.reducer;
