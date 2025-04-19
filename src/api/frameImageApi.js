import api from "../config/axiosConfig";

export const createFrameImage = async (data) => {
    try {
        console.log("Sending request to create frame image");
        const response = await api.post("/api/frameImage/add", data);
        console.log("Frame image created:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error creating frame image:", error);
        throw error;
    }
};

export const getAllFrameImages = async () => {
    try {
        console.log("Fetching all frame images");
        const response = await api.get("/api/frameImage/getAll");
        console.log("Frame images", response.data);
        return response.data;
    } catch (error) {
        console.log("Error fetching frame images:", error);
        throw error;
    }
};

export const getFrameImageById = async (id) => {
    try {
        console.log("Fetching frame image with ID:", id);
        const response = await api.get(`/api/frameImage/getFrameImageById/${id}`);
        console.log("Frame image", response.data);
        return response.data;
    } catch (error) {
        console.log("Error fetching frame image:", error);
        throw error;
    }
}


export const deletFrameImageById = async (id) => {
    try {
        console.log("Deleting frame image with ID:", id);
        const response = await api.delete(`/api/frameImage/delete/${id}`);
        console.log("Frame image deleted", response.data);
        return response.data;
    } catch (error) {
        console.log("Error deleting frame image:", error);
        throw error;
    }
}   