import api from "../config/axiosConfig";

export const createPageTimer = async (data) => {
    try {
        console.log("Sending request to create page timer with data:", data);
        // Ensure timerSeconds is a number
        const payload = {
            pageName: data.pageName,
            timerSeconds: Number(data.timerSeconds)
        };
        const response = await api.post("/api/pageTimer/pages/create", payload);
        console.log("Page timer created:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error creating page timer:", error.response?.data || error.message);
        throw error;
    }
};

export const getPageTimers = async () => {
    try {
        console.log("Sending request to get page timers");
        const response = await api.get("/api/pageTimer/pages/getAll");
        console.log("Page timers:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error getting page timers:", error);
        throw error;
    }
};


export const getTimerByPageName = async (pageName) => {
    try {
        console.log("Sending request to get page timer by page name");
        const response = await api.get(`/api/pageTimer/pages/getByPageName/${pageName}`);
        console.log("Page timer:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error getting page timer by page name:", error);
        throw error;
    }
};

export const updateTimer = async (id, data) => {
    try {
      console.log("Sending request to update page timer with id:", id, "and data:", data);
      const response = await api.put(`/api/pageTimer/pages/update/${id}`, data);
      console.log("Page timer updated:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error updating page timer:", error.response?.data || error.message);
      throw error;
    }
  };

export const deleteTimer = async (id) => {
    try {
        console.log("Sending request to delete page timer");
        const response = await api.delete(`/api/pageTimer/pages/delete/${id}`);
        console.log("Page timer deleted:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error deleting page timer:", error);
        throw error;
    }
};

