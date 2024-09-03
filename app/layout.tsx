import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import { NextTamaguiProvider } from "../components/NextTamaguiProvider";
export const metadata: Metadata = {
  title: "idesign.market",

  description: "The Next Big Thing.",

  icons: "./favicon.ico",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: "#00000" }}>
        <NextTamaguiProvider>{children}</NextTamaguiProvider>
      </body>
    </html>
  );
}
