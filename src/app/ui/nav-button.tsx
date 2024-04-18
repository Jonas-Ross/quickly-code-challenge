import Link from 'next/link';

interface NavButtonProps {
  href: string;
  label: string;
}

export function NavButton({ href, label }: NavButtonProps) {
  return (
    <Link
      className="m-2 block w-[200px] rounded border border-white bg-white p-2 text-center text-black"
      href={href}
    >
      {label}
    </Link>
  );
}
