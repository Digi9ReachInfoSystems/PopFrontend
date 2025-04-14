import api from "../config/axiosConfig";

export const getAllUsers = async () => {
    try {
      
        const response = await api.get("/api/user/getAllUsers");
        console.log("Users", response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};


