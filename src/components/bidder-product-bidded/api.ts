import axiosClient from 'utils/axiosClient';

export async function getlist() {
  const response = await axiosClient.get(
    `/api/bidder/product-bidded/${localStorage.getItem(
      'auction-user-id'
    )}`
  )
  return response.data
}
