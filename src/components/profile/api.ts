import axiosClient from 'utils/axiosClient';

export async function getrole() {
  const response = await axiosClient.post('/api/user/role',{ id: localStorage.getItem('auction-user-id')});
  return response.data.role
}
