import Link from 'next/link';

export default function ApiReferencePage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-20">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-4xl font-black tracking-tight">API Reference</h1>
        <p className="text-muted-foreground">
          API reference docs are coming soon. This page is available now so UI links do not lead to dead routes.
        </p>
        <Link href="/" className="text-primary font-semibold">
          Back to home
        </Link>
      </div>
    </main>
  );
}
