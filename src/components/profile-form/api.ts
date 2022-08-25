import axiosClient from 'utils/axiosClient';

export async function getprofile() {
  const response = await axiosClient.get('/api/user/profile', {
      params: {
        id: localStorage.getItem('auction-user-id'),
      },
    })
  return response.data
}
