"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Alert, Button } from "@mantine/core";
import { toast } from "sonner";
import EditPen from "@/assets/icons/EditPen";
import LoadingBackdrop from "@/features/common/LoadingBackdrop";
import { useGetUserProfile, useUpdateUserProfilePicture } from "@/hooks/user/profile";

const EMPTY = "–";
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

const display = (value, suffix = "") => {
  if (value === null || value === undefined || value === "" || value === "-" || value === EMPTY) return EMPTY;
  return `${value}${suffix}`;
};

const ProductCard = ({ title, fields }) => (
  <section className="min-w-0 bg-white p-5 shadow-sm">
    <h3 className="mb-5 text-lg font-semibold">{title}</h3>
    <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {fields.map(({ label, value, suffix }) => (
        <div key={label} className="min-w-0 border-t border-[#E2E8F0] pt-3 first:border-t-0 sm:first:border-t">
          <dt className="mb-1 text-xs font-medium text-[#64748B]">{label}</dt>
          <dd className="break-words text-lg font-semibold">{display(value, suffix)}</dd>
        </div>
      ))}
    </dl>
  </section>
);

export default function UserPage() {
  const { data, isPending, isError, error, refetch } = useGetUserProfile();
  const fileInputRef = useRef(null);
  const { mutate: updateProfilePicture, isPending: isUploading } =
    useUpdateUserProfilePicture(() => refetch());
  const user = data?.user;

  const handleProfilePicChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!IMAGE_TYPES.includes(file.type)) {
      toast.error("Erlaubt sind JPEG, PNG, GIF und WebP.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Das Bild darf höchstens 5 MB groß sein.");
      return;
    }
    updateProfilePicture(file);
  };

  if (isError) {
    return (
      <div className="p-4 md:p-8">
        <Alert color="red" title="Profil konnte nicht geladen werden">
          <p>{error?.message}</p>
          <Button mt="md" color="dark" onClick={() => refetch()}>Erneut versuchen</Button>
        </Alert>
      </div>
    );
  }

  return (
    <>
      {(isPending || isUploading) && <LoadingBackdrop />}
      <main className="h-full overflow-y-auto px-4 py-6 md:px-8 lg:px-[4.167vw]">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold md:text-2xl">Willkommen zurück, {user?.firstName} {user?.lastName}</h1>
          <Link href="/user/changePassword" className="bg-black px-4 py-2 text-center text-sm font-medium text-white hover:bg-gray-800">
            Passwort ändern
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[263px_minmax(0,1fr)]">
          <aside className="bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Persönliche Informationen</h2>
            <div className="mb-5 flex flex-col items-center">
              <div className="relative mb-4">
                <Image className="size-[72px] rounded-full object-cover" src={user?.profilePicture?.url || "https://res.cloudinary.com/dwa9gziu6/image/upload/v1753884468/generic_profile_crzbbe.png"} alt="Profilbild" width={72} height={72} />
                <button type="button" aria-label="Profilbild ändern" onClick={() => fileInputRef.current?.click()} className="absolute -bottom-1 -right-1 flex size-[30px] items-center justify-center rounded-full bg-white shadow-lg">
                  <EditPen className="size-5" />
                </button>
                <input ref={fileInputRef} type="file" accept={IMAGE_TYPES.join(",")} onChange={handleProfilePicChange} className="hidden" />
              </div>
              <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
              <p className="break-all text-center text-sm text-[#64748B]">{user?.email}</p>
            </div>
            <dl className="space-y-4 border-t border-[#E2E8F0] pt-4 text-sm">
              <div><dt className="text-[#64748B]">Geburtsdatum</dt><dd className="font-medium">{user?.dob ? new Date(user.dob).toLocaleDateString("de-DE") : EMPTY}</dd></div>
              <div><dt className="text-[#64748B]">Geschlecht</dt><dd className="font-medium">{display(user?.gender)}</dd></div>
              <div><dt className="text-[#64748B]">Land</dt><dd className="font-medium">{display(user?.country)}</dd></div>
            </dl>
          </aside>

          <div className="grid min-w-0 gap-6 xl:grid-cols-2">
            {user?.products?.includes("festgeld") && <ProductCard title="Festgeld" fields={[
              { label: "Bank", value: user.festgeld?.bank }, { label: "Betrag", value: user.festgeld?.betrag, suffix: " €" },
              { label: "Zinsen", value: user.festgeld?.zinsen, suffix: " %" }, { label: "Laufzeit (Monate)", value: user.festgeld?.laufzeit },
            ]} />}
            {user?.products?.includes("tagesgeld") && <ProductCard title="Tagesgeld" fields={[
              { label: "Bank", value: user.tagesgeld?.bank }, { label: "Betrag", value: user.tagesgeld?.betrag, suffix: " €" },
              { label: "Zinsen", value: user.tagesgeld?.zinsen, suffix: " %" }, { label: "Garantierte Zinslaufzeit", value: user.tagesgeld?.garantierteZinslaufzeit },
            ]} />}
            {user?.products?.includes("openAI") && <ProductCard title="OpenAI-Investment" fields={[
              { label: "Anzahl", value: user.openAI?.anzahl }, { label: "Gekaufter Wert", value: user.openAI?.gekaufterWert, suffix: " €" },
              { label: "Aktueller Wert", value: user.openAI?.aktuellerWert, suffix: " €" }, { label: "Investition", value: user.openAI?.investition, suffix: " €" },
              { label: "Aktueller Gewinn", value: user.openAI?.aktuellerGewinn, suffix: " €" }, { label: "Depotwert", value: user.openAI?.depotWert, suffix: " €" },
            ]} />}
            {user && !user.products?.length && <Alert color="yellow" title="Keine Produkte zugeordnet">Für dieses Konto sind derzeit keine Produktdaten hinterlegt.</Alert>}
          </div>
        </div>
      </main>
    </>
  );
}
