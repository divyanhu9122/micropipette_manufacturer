"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import type { StaffIdentity } from "@/lib/auth/authorize";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import styles from "../Admin.module.css";

export default function AdminShell({
  children,
  staff,
}: {
  children: ReactNode;
  staff: StaffIdentity;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const titles: Record<string, string> = {
    "/admin": "Dashboard",
    products: "Products",
    brands: "Brands",
    categories: "Categories",
    blog: "Articles",
    resources: "Documents",
    pages: "Website pages",
    settings: "Settings",
    staff: "Staff access",
    enquiries: "Enquiries",
  };
  const title =
    pathname === "/admin"
      ? titles["/admin"]
      : titles[pathname.split("/")[2]] || "Staff workspace";
  useEffect(() => {
    if (!sidebarOpen) return;
    document
      .querySelector<HTMLAnchorElement>("#admin-navigation a[href]")
      ?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
        document.getElementById("admin-menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [sidebarOpen]);
  return (
    <div className={styles.app}>
      <AdminSidebar
        role={staff.role}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className={styles.main}>
        <AdminTopbar
          staff={staff}
          title={title}
          sidebarOpen={sidebarOpen}
          contextText="Staff workspace"
          onToggleSidebar={() => setSidebarOpen((previous) => !previous)}
        />
        <main>{children}</main>
      </div>
    </div>
  );
}
