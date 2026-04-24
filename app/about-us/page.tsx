import Link from 'next/link';

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-20">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-4xl font-black tracking-tight">About Us</h1>
        <p className="text-muted-foreground">
          Dormify helps housing teams run operations across residents, rooms, dining, and services in one place.
        </p>
        <Link href="/" className="text-primary font-semibold">
          Back to home
        </Link>
      </div>
    </main>
  );
}
