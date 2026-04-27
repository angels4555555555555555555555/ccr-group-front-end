import axiosInstance from "@/utils/axiosInstance";

export const klarnaAPIs = {
    getKlarna: async () => {
        try {
            const response = await axiosInstance.get("/admin/retrieveKlarnaPrice");
            return response.data;
        } catch (error) {
            throw new Error(error?.response?.data?.message || "Failed to get klarna. Please try again.");
        }
    },
    updateKlarna: async (data) => {
        try {
            const response = await axiosInstance.patch("/admin/changeKlarnaPrice", data);
            return response.data;
        } catch (error) {
            throw new Error(error?.response?.data?.message || "Failed to update klarna. Please try again.");
        }
    }
};
