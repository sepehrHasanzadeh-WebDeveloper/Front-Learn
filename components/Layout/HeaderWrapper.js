"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

export default function HeaderWrapper({ theme }) {
  const pathname = usePathname();

  if (
    pathname === "/" ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/profile")
  ) {
    return null;
  }

  return <Header theme={theme} />;
}
