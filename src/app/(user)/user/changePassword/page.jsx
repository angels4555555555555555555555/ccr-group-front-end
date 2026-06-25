"use client";

import { Button, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import LoadingBackdrop from "@/features/common/LoadingBackdrop";
import { useUpdateUserPassword } from "@/hooks/user/profile";
import { PASSWORD_PATTERN } from "@/features/admin/UserManagement/userForm";

export default function ChangePasswordPage() {
  const router = useRouter();
  const form = useForm({
    initialValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
    validate: {
      currentPassword: (value) => value ? null : "Aktuelles Passwort ist erforderlich",
      newPassword: (value, values) => {
        if (!PASSWORD_PATTERN.test(value)) return "Mindestens 8 Zeichen mit Großbuchstabe, Zahl und !@#$%^&*";
        if (value === values.currentPassword) return "Das neue Passwort muss sich unterscheiden";
        return null;
      },
      confirmPassword: (value, values) => value === values.newPassword ? null : "Passwörter stimmen nicht überein",
    },
  });
  const { mutate, isPending } = useUpdateUserPassword(() => router.replace("/user"));

  return (
    <main className="h-full overflow-y-auto px-4 py-8 md:px-8 lg:px-[4.167vw]">
      {isPending && <LoadingBackdrop />}
      <h1 className="mb-6 text-2xl font-bold">Passwort ändern</h1>
      <form onSubmit={form.onSubmit(({ currentPassword, newPassword }) => mutate({ currentPassword, newPassword }))} className="max-w-2xl space-y-5 bg-white p-5 shadow-sm md:p-8">
        <PasswordInput label="Aktuelles Passwort" withAsterisk {...form.getInputProps("currentPassword")} />
        <PasswordInput label="Neues Passwort" description="Mindestens 8 Zeichen, Großbuchstabe, Zahl und !@#$%^&*" withAsterisk {...form.getInputProps("newPassword")} />
        <PasswordInput label="Neues Passwort bestätigen" withAsterisk {...form.getInputProps("confirmPassword")} />
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <Button type="button" variant="outline" color="dark" onClick={() => router.push("/user")}>Abbrechen</Button>
          <Button type="submit" color="dark" loading={isPending}>Passwort speichern</Button>
        </div>
      </form>
    </main>
  );
}
