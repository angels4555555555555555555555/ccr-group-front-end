"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import {
  TextInput,
  PasswordInput,
  Button,
  Modal,
  Tooltip,
  CopyButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { toast } from "sonner";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useUserLogin } from "@/hooks/auth";
import LoadingBackdrop from "@/features/common/LoadingBackdrop";

const Page = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [resetEmail, setResetEmail] = useState("");
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Ungültige E-Mail-Adresse",
      password: (value) => value ? null : "Passwort ist erforderlich",
    },
  });

  const { mutate: loginUser, isPending } = useUserLogin(() => {
    router.push("/user");
  });

  const handleSubmit = (values) => {
    loginUser(values);
  };

  return (
    <>
      {isPending && <LoadingBackdrop />}
      <Modal
        className="reset-password"
        centered
        opened={opened}
        onClose={() => {
          setResetEmail("");
          close();
        }}
        title="Passwort zurücksetzen"
      >
        <p className="text-[16px]/[24px] mb-6">
          Um Ihr Passwort zurückzusetzen, wenden Sie sich bitte per E-Mail an
          unser Support-Team. Kopieren Sie die untenstehende E-Mail-Adresse und
          senden Sie Ihre Anfrage, um mit dem Zurücksetzen fortzufahren.
        </p>

        <p className="text-[14px]/[150%] mb-1.5">Kontaktinformation</p>

        <div className="flex gap-4">
          <TextInput
            placeholder="xyz@gmail.com"
            className="flex-1"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.currentTarget.value)}
          />

          <CopyButton value={resetEmail} timeout={1500}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Kopiert!" : "In Zwischenablage kopieren"}
                withArrow
              >
                <Button
                  unstyled
                  className="text-[16px]/[24px] text-white bg-black w-[120px] px-4 py-2 rounded"
                  onClick={() => {
                    if (!resetEmail) {
                      toast.error(
                        "Nichts zu kopieren – bitte geben Sie eine E-Mail-Adresse ein.",
                      );
                      return;
                    }
                    copy();
                    toast.success("E-Mail-Adresse kopiert");
                  }}
                >
                  <div className="flex justify-center items-center gap-2">
                    {copied ? <Check size={24} /> : <Copy size={24} />}
                    <p className="font-bold">
                      {copied ? "Kopiert" : "Kopieren"}
                    </p>
                  </div>
                </Button>
              </Tooltip>
            )}
          </CopyButton>
        </div>
      </Modal>

      <div className="flex flex-col md:flex-row relative min-h-screen">
        {/* Back to home button  */}
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

        <div className="md:flex h-screen lg:w-[45.833%] hidden md:w-[50%] w-full items-center justify-center">
          <img
            src="/spaceX.webp"
            alt="Hintergrundbild Anmeldung"
            className="w-full h-full object-cover hidden md:block"
          />
        </div>

        <div className="flex flex-1 md:mt-0 mt-4 md:w-[50%] w-full flex-col gap-6 md:gap-[30px] justify-center lg:px-[12.361vw] md:px-[8.252vw] px-[16px]">
          <div className="flex flex-col md:gap-5 gap-3 mt-16">
            <h2 className="font-bold text-[24px]/[130%] lg:text-[36px]/[130%]">
              Willkommen bei CCR Group GmbH
            </h2>
            <p className="text-[18px]/[150%] text-[#757575]">
              Melden Sie sich in Ihrem Konto an
            </p>
          </div>
          <form
            onSubmit={form.onSubmit(handleSubmit)}
            className="flex flex-col gap-5"
          >
            <TextInput
              withAsterisk
              label="E-Mail"
              placeholder="deine@email.com"
              className="w-full"
              styles={{ input: { textTransform: "lowercase" } }}
              {...form.getInputProps("email")}
              onChange={(e) =>
                form.setFieldValue("email", e.currentTarget.value.toLowerCase())
              }
            />

            <div className="flex flex-col gap-2">
              <PasswordInput
                label="Passwort"
                placeholder="Geben Sie Ihr Passwort ein"
                withAsterisk
                className="w-full"
                {...form.getInputProps("password")}
              />

              <div
                onClick={open}
                className="text-right mt-3 text-[#4B4B4B] text-[14px]/[150%] cursor-pointer"
              >
                Passwort vergessen?
              </div>
            </div>

            <Button
              unstyled
              type="submit"
              fullWidth
              className="!h-[50px] bg-[#000000] text-white !font-bold text-[16px]/[150%] hover:bg-[#1a1a1a] transition-all duration-200 flex items-center justify-center"
            >
              Einloggen
            </Button>

            <Button
              unstyled
              fullWidth
              onClick={() => router.push("/login/admin")}
              className="!h-[50px] bg-white text-black !font-bold text-[16px]/[150%] transition-all duration-200 flex items-center justify-center border-[#E7E7E7] border-1 lg:absolute lg:top-2 lg:right-6 lg:p-[12px_24px] hover:bg-[#E7E7E7] cursor-pointer top-0"
            >
              Admin-Anmeldung
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Page;
