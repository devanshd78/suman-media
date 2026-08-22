import type { ReactNode } from "react";
import { Header } from "@/components/landing/header";

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
