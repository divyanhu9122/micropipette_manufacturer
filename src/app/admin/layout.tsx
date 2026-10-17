"use client";

import { useState, type ReactNode } from "react";
import AdminSidebar from "@/features/admin/components/AdminSidebar";
import AdminTopbar from "@/features/admin/components/AdminTopbar";
import styles from "@/features/admin/Admin.module.css";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.app}>
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className={styles.main}>
        <AdminTopbar
          title="Micropipette Operations & CMS"
          contextText="Phase 4 Production Prototype Workspace"
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        <main>{children}</main>
      </div>
    </div>
  );
}
