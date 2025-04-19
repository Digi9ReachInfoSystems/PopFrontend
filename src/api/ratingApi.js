import api from"../config/axiosConfig";

export const createRating = async (rating) => {
    try {
        const response = await api.post('/ratings/createRating', rating);
        return response.data;
        } catch (error) {
            console.error(error);
            }
            };


