import { createAsyncThunk } from '@reduxjs/toolkit';
import { TProductQuery, TProductSearchList } from 'models';
import { ThunkOption } from 'redux/thunk';
import axiosClient from 'utils/axiosClient';

export const searchProductTC = createAsyncThunk<
  TProductSearchList,
  TProductQuery,
  ThunkOption
>(
  'productSearchList/searchProduct',
  async function searchProduct(params, thunkAPI) {
    try {
      const { keyword, pricing, timeExpired } = params;

      // if (!keyword) return thunkAPI.rejectWithValue('keyword can not be empty');

      // if (keyword.length < 4)
      //   return thunkAPI.rejectWithValue(
      //     'keyword length must be at least 4 characters'
      //   );

      if (pricing && pricing !== 'asc' && pricing !== 'desc')
        return thunkAPI.rejectWithValue('pricing must be asc or desc');

      if (timeExpired && timeExpired !== 'asc' && timeExpired !== 'desc')
        return thunkAPI.rejectWithValue('time must be asc or desc');

      const response = await axiosClient.get('/api/search', { params });

      return response.data as TProductSearchList;
    } catch (e) {
      return thunkAPI.rejectWithValue('Something wrong here');
    }
  }
);
