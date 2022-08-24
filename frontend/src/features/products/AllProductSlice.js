import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts } from './productApi';

const initialState = {
    status:null,
    error:null,
    response:[]
};


export const getAllProducts = createAsyncThunk(
    'products/fetchAll',
    async (query) => {
      const response = await fetchAllProducts(query);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
);

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
          .addCase(getAllProducts.pending, (state) => {
            state.status = 'loading';
          }).addCase(getAllProducts.rejected,(state,action)=>{
            state.status = 'idle';
            state.error = action.payload;
          })
          .addCase(getAllProducts.fulfilled, (state, action) => {
            state.status = 'idle';
            state.response = action.payload;
          });
      },
});


export default productSlice.reducer;