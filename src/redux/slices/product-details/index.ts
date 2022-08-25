import { createSlice } from '@reduxjs/toolkit';
import { TProductDetailsList, TState } from 'models';
import { getProductDetailsTC } from './getProductDetails';

const initialState: TState<TProductDetailsList> = {
  status: 'idle',
};

const productDetailsListSlice = createSlice({
  name: 'productDetailsList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductDetailsTC.pending, (state, action) => {
        state.errorMsg = undefined;
        state.status = 'pending';
      })
      .addCase(getProductDetailsTC.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'success';
      })
      .addCase(getProductDetailsTC.rejected, (state, action) => {
        state.errorMsg = action.error.message;
        state.status = 'reject';
      });
  },
});

const productDetailsReducer = productDetailsListSlice.reducer;

// export const { } = categoryListSlice.actions;
export default productDetailsReducer;
