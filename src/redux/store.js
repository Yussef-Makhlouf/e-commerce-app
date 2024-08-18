import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productSlice.js";
import favoritesReducer from "./slices/favoriteSlice.js";
import paginationReducer from "./slices/paginationSlice.js";

const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
    pagination: paginationReducer,
  },
});

export default store;
