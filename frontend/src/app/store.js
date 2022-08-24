import { configureStore } from '@reduxjs/toolkit';
import productSlice from '../features/products/AllProductSlice';
import UserSlice from '../features/auth/UserSlice';
import cartSlice from '../features/cart/CartSlice';
export const store = configureStore({
  reducer: {
    product:productSlice,
    user:UserSlice,
    cart:cartSlice
  },
});
