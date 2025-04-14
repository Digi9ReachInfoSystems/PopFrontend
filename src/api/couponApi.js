
import api from "../config/axiosConfig";

export const generateCoupon = async (data) => {
    try {
        console.log("Sending request to generate coupon");
        // Send the data as an object in the POST request
        const response = await api.post("/api/coupon/generate-coupon", data);
        console.log("Coupon generated:", response.data);
        return response.data;
    } catch (error) {
        console.log("Error generating coupon:", error);
        throw error;
    }
};


export const getAllCoupons = async() =>{
    try{
        const response = await api.get("/api/coupon/getAllCoupons");
        return response.data;
    }catch(error){
        console.log(error);
        throw error;
    }
}

export const deleteCoupon = async (id) => {
    try {
  
        const response = await api.delete(`/api/coupon/deleteCoupon/${id}`);
        console.log("Coupon deleted:", response.data);
        return response.data;
    } catch (error) {   
        console.log("Error deleting coupon:", error);
        throw error;
    }
};