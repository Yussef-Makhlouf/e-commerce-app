import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import productReducer from './features/productSlice';
import themeReducer from './features/themeSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    theme: themeReducer,
  },
});
