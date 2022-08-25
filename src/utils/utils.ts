import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BE_HOST,

  timeout: 5000,
  // headers: { 'X-Access-Token': 'accessToken' }
  headers: {
    'Content-Type': 'application/json',
  },
});
// console.log(process.env.REACT_APP_BE_HOST);

export function isLoggedIn() {
  return localStorage.getItem('auction-user-token') !== null;
}

function isRole(role: string) {
  if (!isLoggedIn()) return false;
  return localStorage.getItem('auction-user-role') === role;
}
export function isBidder() {
  return isRole('bidder');
}
export function isSeller() {
  return isRole('seller');
}
// TODO Check if the seller owns the product
export function isSellerForProduct(productId: number) {
  return isSeller();
}
export function isAdmin() {
  return isRole('admin');
}

export function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}
