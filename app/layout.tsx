import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryRowShell from "@/components/category-row-shell";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import PriceTicker from "@/components/price-ticker";
import ToastCloseButton from "@/components/toast-close-button";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "block",
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "আজকের বাজারের দাম এক নজরে",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base-100 font-light text-base-content">
        <div className="sticky top-0 z-40">
          <Navbar />
          <CategoryRowShell />
        </div>
        <Suspense
          fallback={
            <div className="border-b border-black/10 bg-white">
              <div className="skeleton mx-4 my-1 h-6" />
            </div>
          }
        >
          <PriceTicker />
        </Suspense>
        {children}
        <Footer />
        <ToastContainer
          toastClassName="text-sm sm:text-base"
          closeButton={<ToastCloseButton />}
        />
      </body>
    </html>
  );
}
