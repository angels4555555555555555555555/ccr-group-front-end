import axiosInstance from "../utils/axiosInstance";
import { getApiErrorMessage } from "../utils/apiError";
export const authManagementAPIs = {
    adminLogin: async (data) => {
        try {
            const response = await axiosInstance.post("/admin/login", data);
            return response.data;
        } catch (error) {

            throw new Error(getApiErrorMessage(error, "Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut."));
        }
    },
    adminLogout: async () => {
        try {
            const response = await axiosInstance.post("/admin/logout");
            return response.data;
        } catch (error) {

            throw new Error(getApiErrorMessage(error, "Abmeldung fehlgeschlagen. Bitte versuchen Sie es erneut."));
        }
    },
    userLogin: async (data) => {
        try {
            const response = await axiosInstance.post("/user/login", data);
            return response.data;
        } catch (error) {

            throw new Error(getApiErrorMessage(error, "Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut."));
        }
    },
    userLogout: async () => {
        try {
            const response = await axiosInstance.post("/user/logout");
            return response.data;
        } catch (error) {

            throw new Error(getApiErrorMessage(error, "Abmeldung fehlgeschlagen. Bitte versuchen Sie es erneut."));
        }
    },
    checkUserAuthStatus: async () => {
        try {
            const response = await axiosInstance.get("/user/checkAuthStatus");
            return response.data;
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Benutzersitzung konnte nicht geprüft werden."));
        }
    },

    checkAdminAuthStatus: async () => {
        try {
            const response = await axiosInstance.get("/admin/checkAuthStatus");
            return response.data;
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Administratorsitzung konnte nicht geprüft werden."));
        }
    },
};
