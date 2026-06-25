"use client";

import { Button, Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import LoadingBackdrop from "@/features/common/LoadingBackdrop";
import { useAddNewUser } from "@/hooks/admin/userManagement";
import UserFormFields from "./UserFormFields";
import { EMPTY_USER_FORM, toUserPayload, validateUserForm } from "./userForm";

export default function AddNewUserModal({ opened, onClose }) {
  const queryClient = useQueryClient();
  const form = useForm({
    initialValues: structuredClone(EMPTY_USER_FORM),
    validate: (values) => validateUserForm(values, { includeCredentials: true }),
  });
  const { mutate, isPending } = useAddNewUser(() => {
    queryClient.invalidateQueries({ queryKey: ["usersList"] });
    form.reset();
    onClose();
  });

  const close = () => {
    form.reset();
    onClose();
  };

  return (
    <>
      {isPending && <LoadingBackdrop />}
      <Modal opened={opened} onClose={close} title="Neuen Benutzer hinzufügen" centered size="xl">
        <form
          onSubmit={form.onSubmit(
            (values) => mutate(toUserPayload(values, { includeCredentials: true })),
            () => toast.error("Bitte füllen Sie alle Pflichtfelder aus.")
          )}
          className="grid gap-4 p-2 md:grid-cols-2"
        >
          <UserFormFields form={form} includeCredentials />
          <Button type="submit" color="dark" loading={isPending}>Speichern</Button>
          <Button type="button" variant="outline" color="dark" onClick={close}>Abbrechen</Button>
        </form>
      </Modal>
    </>
  );
}
