import Link from 'next/link';

export default function ErrorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-center">Unauthorized. Please log in.</h2>
      <Link
        href="/"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Try again
      </Link>
    </main>
  );
}
