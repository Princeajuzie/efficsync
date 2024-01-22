"use client";
import { ComplexNavbar } from "@/components/navbar/Navbar";
import React from "react";
import { SidebarWithLogo } from "@/components/sidebar/sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex flex-row w-[100%] ">
        <SidebarWithLogo />
        <div className="w-[100%] flex flex-col gap-20 z-50 ">
          <ComplexNavbar />
          {children}
        </div>
      </main>
    </>
  );
}
