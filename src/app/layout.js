import "./globals.css";
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { Toaster } from "sonner";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import QueryProvider from "../providers/QueryProvider";

export const metadata = {
  title: "CCR Group GmbH",
  icons: {
    icon: "/logo2.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" suppressHydrationWarning translate="no">
      <body className="antialiased" suppressHydrationWarning>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <QueryProvider>
            <DatesProvider settings={{ locale: "en", firstDayOfWeek: 0 }}>
              {children}
            </DatesProvider>
          </QueryProvider>
          <Toaster position="bottom-right" />
        </MantineProvider>
      </body>
    </html>
  );
}
