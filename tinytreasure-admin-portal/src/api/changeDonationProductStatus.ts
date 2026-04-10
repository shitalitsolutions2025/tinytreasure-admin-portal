import axios from 'axios';

const API_URL = 'https://api.tinytreasure.app'; // Replace with your actual API URL

export const changeDonationProductStatus = async (productId: string, status: string) => {
    try {
        const response = await axios.patch(`${API_URL}/donation-products/${productId}/status`, { status });
        return response.data;
    } catch (error) {
        console.error('Error changing donation product status:', error);
        throw error;
    }
};