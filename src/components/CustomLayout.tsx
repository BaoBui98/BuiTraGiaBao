"use client";
import React from "react";
import HeaderComponent from "./HeaderComponent";
import { usePathname } from "next/navigation";

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/login" && pathname !== "/register" && <HeaderComponent />}

      {children}
    </>
  );
}
