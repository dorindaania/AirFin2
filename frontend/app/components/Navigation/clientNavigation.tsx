"use client";

import { usePathname } from "next/navigation";
import Navigation from "./navigation";

export default function ClientNavigation() {
  const pathname = usePathname();
  const isAuthPage = pathname === "/auth";

  return !isAuthPage ? <Navigation /> : null;
}
