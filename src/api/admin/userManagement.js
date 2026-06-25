import axiosInstance from "@/utils/axiosInstance";
import { getApiErrorMessage } from "@/utils/apiError";

export const userManagementAPIs = {
    getUsersList: async ({ page = 1, pageSize = 10, searchTerm }) => {
        try {

            const response = await axiosInstance.get("/admin/searchUsers", {
                params: {
                    page,
                    pageSize,
                    searchTerm,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Benutzer konnten nicht geladen werden."));
        }

    },
    addNewUser: async (data) => {
        try {
            const response = await axiosInstance.post("/admin/createUser", data);
            return response.data;
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Benutzer konnte nicht erstellt werden."));
        }
    },
    deleteUser: async (userIds) => {
        try {
            const response = await axiosInstance.patch("/admin/deleteUser",
                {
                    userIds
                }
            )
            return response.data;
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Benutzer konnte nicht gelöscht werden."));
        }
    },
    getUser: async (id) => {
        try {
            const response = await axiosInstance.get(`/admin/getUser/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Benutzer konnte nicht geladen werden."));
        }
    },
    updateUser: async (updatedData) => {
        try {
            const response = await axiosInstance.patch("/admin/updateUser", updatedData);
            return response.data;
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Benutzer konnte nicht aktualisiert werden."));
        }
    },
    revealPassword: async (id) => {
        try {
            const response = await axiosInstance.get(`/admin/revealPassword/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(getApiErrorMessage(error, "Passwort konnte nicht angezeigt werden."));
        }
    },
};
