// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/ProductSlice';
import cartReducer from './slices/CartSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer
  }
});