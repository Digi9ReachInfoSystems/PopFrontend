import api from '../config/axiosConfig';

export const getPayments = async () => {
    try {
        const response = await api.get('/api/payment/get-all-payments');
  console.log("Payments", response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};