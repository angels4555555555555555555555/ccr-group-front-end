import { profileAPIs } from "../../api/admin/profile";
import { useMutationWithToast, useQueryWithErrorToast } from "../../utils/tanstackInstance";

/** -------------------------------
 * 🖼️ Profilbild aktualisieren
 ---------------------------------- */
export const useUpdateProfilePicture = (onSuccessCallback) =>
    useMutationWithToast({
        mutationFn: profileAPIs.updateProfilePicture,
        successMsg: "Profilbild erfolgreich aktualisiert!",
        errorMsg: "Profilbild konnte nicht aktualisiert werden",
        onSuccess: onSuccessCallback,
    });

/** -------------------------------
 * 🖼️ Profilbild abrufen
 ---------------------------------- */
export const useGetAdminProfile = () =>
    useQueryWithErrorToast(
        { queryKey: ["adminProfile"], queryFn: profileAPIs.getProfile },
        "Adminprofil konnte nicht abgerufen werden"
    );

/** -------------------------------
 * 🔑 Passwort ändern
 ---------------------------------- */
export const useChangePassword = (onSuccessCallback) =>
    useMutationWithToast({
        mutationFn: profileAPIs.changePassword,
        successMsg: "Passwort erfolgreich geändert!",
        errorMsg: "Passwort konnte nicht geändert werden",
        onSuccess: onSuccessCallback,
    });
