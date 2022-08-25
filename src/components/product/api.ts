import axiosClient from 'utils/axiosClient';

export function toggleWatchList(productId: number) {
  axiosClient.patch('/api/watch-list', { productId });
}
