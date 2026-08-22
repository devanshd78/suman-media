import type { ReactNode } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
