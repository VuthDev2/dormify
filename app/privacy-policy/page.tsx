import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-20">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-4xl font-black tracking-tight">Privacy Policy</h1>
        <p className="text-muted-foreground">
          Privacy policy details will be expanded in a dedicated legal pass. This placeholder page keeps link flow valid.
        </p>
        <Link href="/" className="text-primary font-semibold">
          Back to home
        </Link>
      </div>
    </main>
  );
}
