import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-20">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-4xl font-black tracking-tight">Terms of Service</h1>
        <p className="text-muted-foreground">
          Terms of service content is coming soon. This route exists now to keep footer navigation functional.
        </p>
        <Link href="/" className="text-primary font-semibold">
          Back to home
        </Link>
      </div>
    </main>
  );
}
