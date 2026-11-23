import ConfirmAccess from "@/features/auth/ConfirmAccess";
export const metadata = {
  title: "Confirm staff access",
  robots: { index: false, follow: false },
};
export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const hash = params.token_hash;
  const type = params.type;
  if (
    typeof hash !== "string" ||
    !/^[A-Za-z0-9_-]{20,512}$/.test(hash) ||
    (type !== "invite" && type !== "recovery")
  )
    return (
      <main className="wrap" style={{ padding: 48 }}>
        <h1>Invalid sign-in link</h1>
        <p>Ask your administrator for a new onboarding link.</p>
      </main>
    );
  return <ConfirmAccess tokenHash={hash} type={type} />;
}
