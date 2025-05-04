"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Provider } from "react-redux";
import { Store } from "@/lib/store";
import NavBar from "./_components/NavBar/page";
import ProtectRouting from "./_components/ProtectRouting/page";
import { ToastContainer, Bounce } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



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
          <ProtectRouting>
            {children}
          </ProtectRouting>
          <ToastContainer position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            limit={5}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </body>
      </Provider>
    </html>
  );
}
