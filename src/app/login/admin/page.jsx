"use client";

import React from "react";
import Image from "next/image";
import Logo from "../../../assets/icons/logo";
import background from "../../../assets/images/bg-sk-admin.jpg";
import { TextInput, PasswordInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useAdminLogin } from "@/hooks/auth";
import LoadingBackdrop from "@/features/common/LoadingBackdrop";

export default function AdminLoginPage() {
  const router = useRouter();
  const [visible, { toggle }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        /^\S+@\S+\.\S+$/.test(value)
          ? null
          : "Bitte geben Sie eine gültige E-Mail-Adresse ein",
      password: (value) => value ? null : "Passwort ist erforderlich",
    },
  });
  const { mutate, isPending } = useAdminLogin(() => {
    router.push("/admin/");
  });
  const handleSubmit = (values) => {
    mutate(values);
  };

  return (
    <>
      {isPending && <LoadingBackdrop />}
      <div className="admin relative h-[100vh] flex flex-col items-center gap-8 justify-center">
        {/* Hintergrund */}
        <img
          src="/spacex-scaled.jpg"
          alt=""
          fill
          className="object-cover h-full w-full absolute top-0 left-0 -z-10"
          priority
        />

        {/* Back to Home Button */}
        <button
          type="button"
          className="absolute flex items-center gap-1 top-2 left-2 md:top-3 md:left-10 z-10 px-2 py-1 md:px-3 md:py-2 bg-white/80 hover:bg-white text-black  shadow transition-all cursor-pointer border border-gray-200"
          onClick={() => router.push("/")}
          aria-label="Zur Startseite"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 md:w-6 md:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          <span className="font-semibold hidden sm:inline">
            <span className="hidden md:inline">Zurück nach Hause</span>
            <span className="md:hidden">Zurück</span>
          </span>
        </button>

        {/* Kundenanmeldung */}
        <Button
          unstyled
          onClick={() => router.push("/login")}
          className="hidden lg:flex items-center justify-center
                   absolute top-6 right-6 z-10
                   px-6 py-3 border border-[#E7E7E7] bg-black text-white font-bold
                   hover:bg-[#E7E7E7] hover:text-black transition-all duration-200 cursor-pointer
                   rounded"
        >
          Kundenanmeldung
        </Button>

        {/* Zentrale Anmeldekarte */}
        <div className="w-full flex flex-col items-center lg:justify-center lg:px-[30.306vw] md:px-[25.879vw] px-[16px] ">
          <div
            className="w-full max-w-[560px]
                     lg:p-6 p-4 border border-[#525252] rounded-lg
                     bg-gradient-to-t from-[#000000] to-[#525252]
                     backdrop-blur-[5.5px]"
          >
            <h2 className="text-white font-bold lg:text-[36px]/[130%] text-[24px]/[130%]">
              CCR Group GmbH Admin
            </h2>
            <p className="mt-5 lg:text-[18px]/[150%] text-[#BDBDBD] mb-6">
              Melden Sie sich bei Ihrem Konto an
            </p>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              {/* E-Mail */}
              <TextInput
                withAsterisk
                label="E-Mail"
                placeholder="deine@email.com"
                className="w-full mb-6"
                classNames={{
                  root: "w-full",
                  input:
                    "h-[50px] bg-white border border-[#4B4B4B] rounded w-full",
                  innerInput:
                    "bg-transparent border-none w-full h-full text-[14px] leading-[150%] px-[20px] py-[14.5px]",
                  label: "text-white",
                }}
                {...form.getInputProps("email")}
              />

              {/* Passwort */}
              <PasswordInput
                withAsterisk
                label="Passwort"
                placeholder="Geben Sie Ihr Passwort ein"
                visible={visible}
                onVisibilityChange={toggle}
                className="w-full mb-6"
                classNames={{
                  root: "w-full",
                  input:
                    "h-[50px] bg-white border border-[#4B4B4B] rounded w-full",
                  innerInput:
                    "bg-transparent border-none w-full h-full text-[14px] leading-[150%] px-[20px] py-[14.5px]",
                  label: "text-white",
                  visibilityToggle: "text-gray-600 hover:text-black",
                }}
                {...form.getInputProps("password")}
              />

              {/* Anmelden */}
              <Button
                unstyled
                type="submit"
                className="w-full !h-[50px] bg-white text-black !font-bold text-[16px]/[150%]
                         hover:bg-[#e6e0e0] transition-all duration-200
                         flex items-center justify-center cursor-pointer rounded"
              >
                Einloggen
              </Button>
            </form>
          </div>

          {/* Mobile Kundenanmeldung */}
          <Button
            unstyled
            onClick={() => router.push("/login")}
            className="lg:hidden px-[12px_24px] !h-[50px] text-white !font-bold text-[16px]/[150%]
                         transition-all duration-200 flex items-center justify-center
                         border border-[#E7E7E7] hover:bg-[#E7E7E7] hover:text-black cursor-pointer rounded mx-auto mt-6 "
          >
            Kundenanmeldung
          </Button>
        </div>
      </div>
    </>
  );
}
