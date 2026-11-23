"use client";

import { useState, type ReactNode } from "react";
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
          title="Micropipette Operations & CMS"
          contextText="Staff workspace"
          onToggleSidebar={() => setSidebarOpen((previous) => !previous)}
        />
        <main>{children}</main>
      </div>
    </div>
  );
}
