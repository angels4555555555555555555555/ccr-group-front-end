import axiosInstance from "@/utils/axiosInstance";
import { getApiErrorMessage } from "@/utils/apiError";
export const profileAPIs = {
    updateProfilePicture: async (file) => {
        try {
            const formData = new FormData();
            formData.append("image", file);

            const response = await axiosInstance.patch("/admin/updateProfilePicture", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            throw new Error(
                getApiErrorMessage(error, "Profilbild konnte nicht aktualisiert werden.")
            );
        }
    },
    getProfile: async () => {
        try {
            const response = await axiosInstance.get("/admin/getProfile");
            return response.data;
        } catch (error) {
            throw new Error(
                getApiErrorMessage(error, "Adminprofil konnte nicht geladen werden.")
            );
        }
    },
    changePassword: async (data) => {
        try {
            const response = await axiosInstance.patch("/admin/changePassword", data);
            return response.data;
        } catch (error) {
            throw new Error(
                getApiErrorMessage(error, "Passwort konnte nicht geändert werden.")
            );
        }
    },
};
