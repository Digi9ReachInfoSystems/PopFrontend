import api from '../config/axiosConfig';


export const getFrameById = async (id) => {
    try {
        console.log("Fetching frame with ID:", id);
        const response = await api.get(`/api/frame/frames/${id}`);
        console.log("Frame", response.data);
        return response.data;
    } catch (error) {
        console.log("Error fetching frame:", error);
        throw error;
    }
};


export const getAllFrames = async () => {
    try {
        console.log("Fetching all frames");
        const response = await api.get("/api/frame/frames");
        console.log("Frames", response.data);
        return response.data;
    } catch (error) {
        console.log("Error fetching frames:", error);
        throw error;
    }
};

export const updateFrameById = async (id, data) => {
    try {
        console.log("Sending request to update frame with ID:", id);
        const response = await api.put(`/api/frame/frames/${id}`, data);
        console.log("Frame updated:", response.data);  // Log the response data
        return response.data;
    } catch (error) {
        console.error("Error updating frame:", error);
        throw error;
    }
};



export const deleteFrameById = async (id) => {
    try {
        console.log("Deleting frame with ID:", id);
        const response = await api.delete(`/api/frame/frames/${id}`);
        console.log("Frame deleted", response.data);
        return response.data;
    } catch (error) {
        console.log("Error deleting frame:", error);
        throw error;
    }
};

export const createFrame = async (data) => {
    try {
        console.log("Sending request to create frame");
        const response = await api.post("/api/frame/frames", data);
        console.log("Frame created:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error creating frame:", error);
        throw error;
    }
};