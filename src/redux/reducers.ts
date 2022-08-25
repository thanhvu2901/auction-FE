import { combineReducers } from 'redux';

import counter from 'redux/slices/counter';
import categoryListReducer from './slices/category-list';
import productSearchListReducer from './slices/product-search-list';
import productDetailsReducer from './slices/product-details';

const rootReducer = combineReducers({
  counter,
  categoryList: categoryListReducer,
  productSearchList: productSearchListReducer,
  productDetailsList: productDetailsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
