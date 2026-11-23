import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export function notificationConfig() {
  const key = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  const to = process.env.NOTIFICATION_EMAIL?.trim();
  const email = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/;
  return key?.startsWith("re_") &&
    !/your_|placeholder|replace/i.test(key) &&
    from &&
    to &&
    email.test(from) &&
    email.test(to)
    ? { key, from, to }
    : null;
}

/** The durable database outbox survives delivery failures and process restarts. */
export async function deliverEnquiryNotifications(
  client: SupabaseClient,
  receipt?: string,
) {
  const config = notificationConfig();
  if (!config) return { configured: false, sent: 0, failed: 0 };
  const { data: jobs, error: claimError } = await client.rpc(
    "claim_enquiry_notifications",
    { p_limit: receipt ? 1 : 10, p_receipt: receipt || null },
  );
  if (claimError || !Array.isArray(jobs)) {
    console.error("[Notifications] Queue unavailable");
    return { configured: true, sent: 0, failed: 1 };
  }
  let sent = 0,
    failed = 0;
  for (const job of jobs) {
    let succeeded = false;
    try {
      const { data: enquiry, error } = await client
        .from("enquiries")
        .select(
          "enquiry_id,name,email,company,country,phone,product_title,quantity,message,oem_specifications",
        )
        .eq("id", job.enquiry_id)
        .single();
      if (error || !enquiry) throw new Error("Enquiry unavailable");
      const body = [
        `New website enquiry: ${enquiry.enquiry_id}`,
        ...Object.entries(enquiry)
          .filter(([key]) => key !== "enquiry_id")
          .map(
            ([key, value]) => `${key.replaceAll("_", " ")}: ${value ?? "—"}`,
          ),
      ].join("\n\n");
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        redirect: "error",
        signal: AbortSignal.timeout(5000),
        headers: {
          Authorization: `Bearer ${config.key}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `enquiry-${job.job_id}`,
        },
        body: JSON.stringify({
          from: config.from,
          to: [config.to],
          reply_to: enquiry.email,
          subject: `Website enquiry ${enquiry.enquiry_id}`,
          text: body,
        }),
      });
      const result = await response.json().catch(() => null);
      succeeded =
        response.ok && typeof result?.id === "string" && Boolean(result.id);
    } catch {
      /* Provider details can contain private content; do not log them. */
    }
    const { error } = await client.rpc("finish_enquiry_notification", {
      p_job_id: job.job_id,
      p_succeeded: succeeded,
    });
    if (succeeded && !error) sent++;
    else failed++;
  }
  return { configured: true, sent, failed };
}
