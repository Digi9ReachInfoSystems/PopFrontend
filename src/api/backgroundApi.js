import api from "../config/axiosConfig";

export const registerDevice = async (data) => {
  try{
    const response = await api.post("/api/background/register", data);
    console.log("Device registration",response.data);
    return response.data;
  }catch(error){
    console.log(error);
    throw error;
  }
};

export const getDevices = async () => {
  try{
    const response = await api.get("/api/background/devices");
    console.log("Devices",response.data);
    return response.data;
  }catch(error){
    console.log(error);
    throw error;
  }
};

export const updateDevice = async (formData) => {
    try {
      console.log("Updating device", formData);
      const response = await api.put("/api/background/update-background-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
      console.log("Device updated", response.data);
      return response.data;
    } catch (error) {
      console.log("Error:", error);
      throw error;
    }
  };
  

export const deleteDevice = async (device_key) => {
    try {
      const response = await api.delete(`/api/background/deleteDevice/${device_key}`);
      console.log("Device deleted:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error deleting device:", error);
      throw error;
    }
  };
  