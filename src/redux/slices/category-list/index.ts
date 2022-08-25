import { createSlice } from '@reduxjs/toolkit';
import { TCategoryList, TState } from 'models';
import { addThunkBuilderCases } from 'redux/thunk';
import { getCategoryListTC } from './getCategoryList';

const initialState: TState<TCategoryList> = {
  status: 'idle',
};

const categoryListSlice = createSlice({
  name: 'categoryList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    addThunkBuilderCases(builder, getCategoryListTC);
    // builder
    //   .addCase(getCategoryListTC.pending, (state, action) => {
    //     state.errorMsg = undefined;
    //     state.status = 'pending';
    //   })
    //   .addCase(getCategoryListTC.fulfilled, (state, action) => {
    //     state.data = action.payload;
    //     state.status = 'success';
    //   })
    //   .addCase(getCategoryListTC.rejected, (state, action) => {
    //     state.errorMsg = action.payload;
    //     state.status = 'reject';
    //   })
  },
});

const categoryListReducer = categoryListSlice.reducer;

// export const { } = categoryListSlice.actions;
export default categoryListReducer;
