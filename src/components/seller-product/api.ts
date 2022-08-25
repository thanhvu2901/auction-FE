import axiosClient from 'utils/axiosClient';

 async function getlist() {
  const response = await axiosClient.get(
    `/api/seller/product-selling/${localStorage.getItem(
      'auction-user-id'
    )}`
  )
  return response.data
}
async function getrole() {
    const response = await axiosClient.get(
        `/api/seller/checkrole/${localStorage.getItem('auction-user-id')}`
      );
    return response.data
  }

export{getlist,getrole}