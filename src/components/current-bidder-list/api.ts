import axiosClient from "utils/axiosClient";

export type TCurrentBidder = {
    id: number;
    fullName: string;
    isBlocked: boolean;
    createdAt: string;
}

export async function getCurrentBidder(bidderId: number) {
    const response = await axiosClient.get(`/api/current-bidder/${bidderId}`)
    return response.data as TCurrentBidder[];
}

export async function blockBidder(productId: number, bidderId: number) {
    const data = {
        productId,
        bidderId
    };
    const response = await axiosClient.patch(`/api/current-bidder`, data)
    return response.data as TCurrentBidder[];
}

export async function checkSellerOfProduct(productId: number) {
    const userId = parseInt(localStorage.getItem('auction-user-id'));
    const response = await axiosClient.get(`/api/seller/${userId}}/${productId}`);
    return (response.data['isSellerOfProduct']) as boolean;
}