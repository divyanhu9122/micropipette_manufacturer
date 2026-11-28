export const STAFF_ROLES = ["admin", "editor", "sales"] as const;
export type StaffRole = (typeof STAFF_ROLES)[number];

export type Permission =
  | "staff:access"
  | "content:read"
  | "content:write"
  | "content:publish"
  | "enquiries:read"
  | "enquiries:write"
  | "settings:manage"
  | "staff:manage";

const permissions: Record<StaffRole, readonly Permission[]> = {
  admin: [
    "staff:access",
    "content:read",
    "content:write",
    "content:publish",
    "enquiries:read",
    "enquiries:write",
    "settings:manage",
    "staff:manage",
  ],
  editor: ["staff:access", "content:read", "content:write"],
  sales: ["staff:access", "enquiries:read", "enquiries:write"],
};

export function isStaffRole(role: unknown): role is StaffRole {
  return typeof role === "string" && STAFF_ROLES.some((item) => item === role);
}

export function hasPermission(role: StaffRole, permission: Permission) {
  return permissions[role].includes(permission);
}

export function permissionForAdminPath(pathname: string): Permission {
  if (pathname === "/admin/staff" || pathname.startsWith("/admin/staff/"))
    return "staff:manage";
  if (
    pathname === "/admin/enquiries" ||
    pathname.startsWith("/admin/enquiries/")
  )
    return "enquiries:read";
  if (pathname === "/admin/settings" || pathname.startsWith("/admin/settings/"))
    return "settings:manage";
  if (pathname === "/admin" || pathname === "/admin/") return "staff:access";
  return "content:read";
}
