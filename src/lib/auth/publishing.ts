import { HttpError } from "@/lib/http/errors";
import { hasPermission, type StaffRole } from "./permissions";

export function assertCanPublish(role: StaffRole, published: unknown) {
  if (published === true && !hasPermission(role, "content:publish")) {
    throw new HttpError(
      403,
      "PUBLISHING_FORBIDDEN",
      "An administrator must publish this content.",
    );
  }
}
