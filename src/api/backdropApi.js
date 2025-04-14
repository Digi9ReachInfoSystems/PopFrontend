import api from "../config/axiosConfig";

export const createBackdrop = async (frameId,data) => {
    try {
        console.log("Sending request to create backdrop");
        const response = await api.post(`/api/backdrop/createBackdrop/${frameId}`, frameId,data);
        console.log("Backdrop created successfully");
        return response.data;
    } catch (error) {
        console.error("Error creating backdrop:", error);
        throw error;
    }
};

export const getAllBackdrops = async () => {
    try {
        console.log("Fetching all backdrops");
        const response = await api.get("/api/backdrop/getAllBackdrops");
        console.log("Backdrops", response.data);
        return response.data;
    } catch (error) {
        console.log("Error fetching backdrops:", error);
        throw error;
    }
};

export const updateBackdropById = async (id, data) => {
    try {
        console.log("Sending request to update backdrop");
        const response = await api.put(`/api/backdrop/updateBackdrop/${id}`, data);
        console.log("Backdrop updated successfully");
        return response.data;
    } catch (error) {
        console.error("Error updating backdrop:", error);
        throw error;
    }
};

export const deleteBackdropById = async (id) => {
    try {
        console.log("Sending request to delete backdrop");
        const response = await api.delete(`/api/backdrop/deleteBackdrop/${id}`);
        console.log("Backdrop deleted successfully");
        return response.data;
    } catch (error) {
        console.error("Error deleting backdrop:", error);
        throw error;
    }
}