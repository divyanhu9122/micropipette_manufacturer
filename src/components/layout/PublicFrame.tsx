import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function PublicFrame({ children }: { children: ReactNode }) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
