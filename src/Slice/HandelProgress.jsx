import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  progress: "",
};

const HandelProgress = createSlice({
  name: " progress",
  initialState,

  reducers: {
    showCart(state, action) {
      return { progress: "cart" };
    },
    hideCart(state, action) {
      return { progress: "" };
    },
    showCheckout(state, action) {
      return { progress: "checkout" };
    },
    hideCheckout(state, action) {
      return { progress: "" };
    },
  },
});

export const { showCart, hideCart, showCheckout, hideCheckout } =
  HandelProgress.actions;

export default HandelProgress.reducer;
