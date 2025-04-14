import api from "../config/axiosConfig";
export const numberOfCopiesById = async (id) => {
    try {
        console.log("Fetching number of coppies by id", id);
        const response = await api.get(`/api/copies/getCopiesById/${id}`);
        console.log("Number of copies", response.data); 
        return response.data;
    } catch (error) {
        console.log("Error fetching number of copies:", error); 
        throw error; 
    }
};

export const getCopies = async () => {
    try {
        console.log("Fetching copies");
        const response = await api.get("/api/copies/getAllCopies");
        console.log("Copies:", response.data);
        return response.data;  
    } catch (error) {
        console.log("Error fetching copies:", error);  
        throw error; 
    }
};


export const createCopy = async (data) => {
    try {
        console.log("Sending request to create copy");
        const response = await api.post("/api/copies/add", data);
        console.log("Copy created:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error creating copy:", error);
        throw error;
    }
};

export const deleteCopy = async (id) => {
    try {
        console.log("Sending request to delete copy");
        const response = await api.delete(`/api/copies/${id}`);
        console.log("Copy deleted:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error deleting copy:", error);
        throw error;
    }
};