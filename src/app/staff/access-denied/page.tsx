import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Staff access required",
  robots: { index: false, follow: false },
};

export default function StaffAccessDeniedPage() {
  return (
    <main style={{ maxWidth: 600, margin: "80px auto", padding: 24 }}>
      <h1>Staff access required</h1>
      <p>
        Your account does not have permission to open this part of the
        workspace. Contact your administrator if your access needs to change.
      </p>
      <Link href="/admin">Open your workspace</Link>
      <p>
        <Link href="/staff/login">Sign in with another account</Link>
      </p>
    </main>
  );
}
