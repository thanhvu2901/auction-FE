import { createSlice } from '@reduxjs/toolkit';
import { TProductSearchList, TState } from 'models';
import { addThunkBuilderCases } from 'redux/thunk';
import { searchProductTC } from './searchProduct';

const initialState: TState<TProductSearchList> = {
  status: 'idle',
};

const productSearchList = createSlice({
  name: 'productSearchList',
  initialState,
  reducers: {},
  extraReducers(builder) {
    addThunkBuilderCases(builder, searchProductTC);
  },
});

const productSearchListReducer = productSearchList.reducer;

// export const { } = categoryListSlice.actions;
export default productSearchListReducer;
