import axios from 'axios';

const API_BASE_URL = 'https://api.tinytreasure.app'; // Replace with your actual API base URL

export const changeProductStatus = async (productId: string, newStatus: string) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/products/${productId}/status`, {
            status: newStatus
        });
        return response.data;
    } catch (error) {
        console.error('Error changing product status:', error);
        throw error;
    }
};