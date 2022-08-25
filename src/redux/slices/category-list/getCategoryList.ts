import { createAsyncThunk } from '@reduxjs/toolkit';
import { TCategoryList } from 'models';
import { ThunkOption } from 'redux/thunk';
import axiosClient from 'utils/axiosClient';

export const getCategoryListTC = createAsyncThunk<
  TCategoryList,
  undefined,
  ThunkOption
>(
  'categoryList/getCategoryList',
  async function getCategoryList(params, thunkAPI) {
    try {
      const response = await axiosClient.get('/api/category');
      return response.data as TCategoryList;
    } catch (e) {
      return thunkAPI.rejectWithValue('Something wrong here');
    }
  }
);
