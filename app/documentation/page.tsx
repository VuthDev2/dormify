import Link from 'next/link';

export default function DocumentationPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-20">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-4xl font-black tracking-tight">Documentation</h1>
        <p className="text-muted-foreground">
          Documentation content is being prepared. This placeholder keeps navigation and testing flows unblocked.
        </p>
        <Link href="/" className="text-primary font-semibold">
          Back to home
        </Link>
      </div>
    </main>
  );
}
