import axiosInstance from "@/utils/axiosInstance";
import { getApiErrorMessage } from "@/utils/apiError";

export const userProfileAPIs = {
  /** Get User Profile */
  getProfile: async () => {
    try {
      const response = await axiosInstance.get("/user/getProfile");

      return response.data;
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "Benutzerprofil konnte nicht geladen werden.")
      );
    }
  },

  /** Update Profile Picture (multipart/form-data) */
  updateProfilePicture: async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axiosInstance.patch(
        "/user/updateProfilePicture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "Profilbild konnte nicht aktualisiert werden.")
      );
    }
  },
  updatePassword: async (data) => {
    try {
      const response = await axiosInstance.put("/user/updatePassword", data);
      return response.data;
    } catch (error) {
      throw new Error(
        getApiErrorMessage(error, "Passwort konnte nicht aktualisiert werden.")
      );
    }
  },
};
