import axiosInstance from "../utils/axiosInstance";
export const authManagementAPIs = {
    adminLogin: async (data) => {
        try {
            const response = await axiosInstance.post("/admin/login", data);
            return response.data;
        } catch (error) {

            throw new Error(error?.response?.data?.message || "Failed to login. Please try again.");
        }
    },
    adminLogout: async () => {
        try {
            const response = await axiosInstance.post("/admin/logout");
            return response.data;
        } catch (error) {

            throw new Error(error?.response?.data?.message || "Failed to logout. Please try again.");
        }
    },
    userLogin: async (data) => {
        try {
            const response = await axiosInstance.post("/user/login", data);
            return response.data;
        } catch (error) {

            throw new Error(error?.response?.data?.message || "Failed to login. Please try again.");
        }
    },
    userLogout: async () => {
        try {
            const response = await axiosInstance.post("/user/logout");
            return response.data;
        } catch (error) {

            throw new Error(error?.response?.data?.message || "Failed to logout. Please try again.");
        }
    },
    checkUserAuthStatus: async () => {
        try {
            const response = await axiosInstance.get("/user/checkAuthStatus");
            return response.data;
        } catch (error) {
            console.error("User auth check error:", error);
            throw new Error(error?.response?.data?.message || "Failed to verify user auth.");
        }
    },

    checkAdminAuthStatus: async () => {
        try {
            const response = await axiosInstance.get("/admin/checkAuthStatus");
            return response.data;
        } catch (error) {
            console.error("Admin auth check error:", error);
            throw new Error(error?.response?.data?.message || "Failed to verify admin auth.");
        }
    },
};