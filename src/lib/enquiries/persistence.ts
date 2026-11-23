import "server-only";
import { randomUUID } from "node:crypto";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { ValidatedEnquiry } from "@/lib/validation/enquiry";
import { databaseError } from "@/lib/http/responses";
import { HttpError } from "@/lib/http/errors";

export async function persistEnquiry(
  client: SupabaseClient,
  enquiry: ValidatedEnquiry,
  ip: string,
  idempotencyKey?: string,
) {
  const enquiryId = `ENQ-${randomUUID()}`;
  const input = {
    name: enquiry.name,
    email: enquiry.email,
    phone: enquiry.phone ?? null,
    company: enquiry.company,
    country: enquiry.country,
    message: enquiry.message,
    quantity: enquiry.quantity ?? null,
    oem_specifications: enquiry.oemSpecifications ?? null,
    product_slug: enquiry.productSlug ?? null,
    product_title: enquiry.productTitle ?? enquiry.product ?? null,
    enquiry_type: enquiry.enquiryType,
  };
  const { data, error } = await client
    .from("enquiries")
    .insert({
      enquiry_id: enquiryId,
      ...input,
      status: "new",
      ip_address: ip,
      ...(idempotencyKey ? { idempotency_key: idempotencyKey } : {}),
    })
    .select("enquiry_id")
    .single();

  if (error?.code === "23505" && idempotencyKey) {
    const previous = await client
      .from("enquiries")
      .select(`enquiry_id,${Object.keys(input).join(",")}`)
      .eq("idempotency_key", idempotencyKey)
      .maybeSingle();
    if (previous.error)
      databaseError(previous.error, "confirm previous enquiry");
    const row = previous.data as unknown as Record<string, unknown> | null;
    if (
      row &&
      Object.entries(input).every(([key, value]) => row[key] === value) &&
      typeof row.enquiry_id === "string"
    )
      return row.enquiry_id;
    throw new HttpError(
      409,
      "SUBMISSION_CONFLICT",
      "This submission reference was already used. Refresh the form and try again.",
    );
  }
  if (error || data?.enquiry_id !== enquiryId)
    databaseError(error, "save enquiry");
  return enquiryId;
}
