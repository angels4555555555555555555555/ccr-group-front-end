"use client";

import { useEffect } from "react";
import { Alert, Button, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import LoadingBackdrop from "@/features/common/LoadingBackdrop";
import { useGetUser, useUpdateUser } from "@/hooks/admin/userManagement";
import UserFormFields from "./UserFormFields";
import { EMPTY_USER_FORM, toUserPayload, userToFormValues, validateUserForm } from "./userForm";

export default function EditUserModal({ opened, onClose, currentUser: id }) {
  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useGetUser(id);
  const form = useForm({
    initialValues: structuredClone(EMPTY_USER_FORM),
    validate: validateUserForm,
  });
  const { mutate, isPending: isUpdating } = useUpdateUser(() => {
    queryClient.invalidateQueries({ queryKey: ["usersList"] });
    queryClient.invalidateQueries({ queryKey: ["user", id] });
    onClose();
  });

  useEffect(() => {
    if (data?.user) form.setValues(userToFormValues(data.user));
  }, [data]);

  return (
    <>
      {(isPending || isUpdating) && <LoadingBackdrop />}
      <Modal opened={opened} onClose={onClose} title="Benutzer bearbeiten" centered size="xl">
        {isError ? (
          <Alert color="red" title="Benutzer konnte nicht geladen werden">{error?.message}</Alert>
        ) : (
          <form
            onSubmit={form.onSubmit(
              (values) => mutate({ userId: id, ...toUserPayload(values) }),
              () => toast.error("Bitte füllen Sie alle Pflichtfelder aus.")
            )}
            className="grid gap-4 p-2 md:grid-cols-2"
          >
            <UserFormFields form={form} />
            <Button type="submit" color="dark" loading={isUpdating}>Änderungen speichern</Button>
            <Button type="button" variant="outline" color="dark" onClick={onClose}>Abbrechen</Button>
          </form>
        )}
      </Modal>
    </>
  );
}
