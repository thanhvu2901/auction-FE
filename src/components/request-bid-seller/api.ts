import axiosClient from 'utils/axiosClient';

export async function getlist() {
  const response = await axiosClient.get(
    `/api/seller/request-bid/${localStorage.getItem('auction-user-id')}`
  );
  return response.data
}
