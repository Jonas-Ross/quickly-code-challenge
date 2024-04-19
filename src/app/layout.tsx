import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quickly Code Challenge | Jonas Ross',
  description:
    'This is a code challenge for the Quickly team and their job application process.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="absolute w-full">
          <Link className="mr-8 pl-24" href={'/'}>
            Home
          </Link>
          <Link className="mr-8" href={'/login'}>
            Login
          </Link>
          <Link className="mr-8" href={'/signup'}>
            Signup
          </Link>
          <Link className="mr-8" href={'/profile'}>
            Profile
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
