"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { Store } from "@/lib/store";
import NavBar from "./_components/NavBar/page";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={Store}>
        <body className="vsc-initialized">
          <NavBar />
          {children}
        </body>
      </Provider>
    </html>
  );
}
