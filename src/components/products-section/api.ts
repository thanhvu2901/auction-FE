import { TProduct, TRelatedProduct } from 'models';
import axiosClient from 'utils/axiosClient';

export async function getPriciestProducts() {
  const response = await axiosClient.get('/api/product/top-priciest');
  return response.data as TProduct[];
}
export async function getTopAutionLogProducts() {
  const response = await axiosClient.get('/api/product/top-auction-log');
  return response.data as TProduct[];
}
export async function getTopClosingProducts() {
  const response = await axiosClient.get('/api/product/top-near-end');
  return response.data as TProduct[];
}
export async function getRelatedProducts(section: string) {
  const response = await axiosClient.get(`/api/product/related/${section}`);
  return response.data as TProduct[];
}
