import api from "../config/axiosConfig" 

export const adminLogin = async (data) => {
    try {
        console.log("Sending request to admin login");
        const response = await api.post("/api/admin/login", data);
        console.log("Admin logged in:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error logging in:", error);
        throw error;
    }
};

export const getadminById = async (id) => {
    try {
        console.log("Sending request to get admin by ID");
        const response = await api.get(`/api/admin/getAdminByUserId/${id}`);
        console.log("Admin retrieved:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error retrieving admin:", error);
        throw error;
    }
};

export const getAdminFromToken = async (data) => {
    try {
        
        console.log("Sending request to get admin from token",);
        const response = await api.post("/api/admin/getAdminFromToken",data);
        console.log("Admin retrieved:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error retrieving admin:", error);
        throw error;
    }
};