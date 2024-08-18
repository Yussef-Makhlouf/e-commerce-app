import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: JSON.parse(localStorage.getItem("favorites")) || [],
  reducers: {
    toggleFavorite: (state, action) => {
      const product = action.payload;
      const existingProduct = state.find((item) => item._id === product._id);
      if (existingProduct) {
        return state.filter((item) => item._id !== product._id);
      } else {
        state.push(product);
      }
    },
    removeFavorite: (state, action) => {
      const productId = action.payload;
      return state.filter((item) => item._id !== productId);
    },
  },
});

export const { toggleFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
