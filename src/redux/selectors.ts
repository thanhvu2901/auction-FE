import { RootState } from './reducers';

export function selectCategoryList(state: RootState) {
  return state.categoryList;
}

export function selectProductSearchList(state: RootState) {
  return state.productSearchList;
}

export function selectProductDetails(state: RootState) {
  return state.productDetailsList;
}
