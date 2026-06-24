import "./globals.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import styles from "../components/Hero/Hero.module.css";
import { myFonts, avinyFont } from "./fonts";
import { Toaster } from "sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import HeaderWrapper from "@/components/Layout/HeaderWrapper";

import FooterWrapper from "@/components/Layout/FooterWrapper";
import CartProvider from "@/contexts/CartContext";

const theme = {
  buttonBg: "bg-gray-100",
  buttonText: "text-gray-700",
  buttonHover: "bg-gray-200",
  menuBg: "bg-white",
  menuBorder: "border-gray-200",
  menuText: "text-gray-700",
  menuHoverBg: "bg-gray-100",
  menuHoverText: "text-gray-900",
  logoutText: "text-red-500",
  logoutHoverBg: "bg-red-50",
};

export const metadata = {
  title: "فرانت لرن | front learn",
  description:
    "جدید ترین متد های برنامه نویسی در فرانت لرن . جدید ترین دوره ها با معماری جدید",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fa"
      className={`h-full antialiased ${myFonts.variable} ${avinyFont.variable}`}
      dir="rtl"
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <CartProvider>
            <Toaster position="top-right" richColors expand={false} />
            <div className={styles.Header_bg_none_section}>
              <HeaderWrapper theme={theme} />
            </div>
            {children}
          </CartProvider>
        </AuthProvider>
        <FooterWrapper />
      </body>
    </html>
  );
}
