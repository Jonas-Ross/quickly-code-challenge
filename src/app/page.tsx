import { NavButton } from '@/app/ui/nav-button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      <div className="bg-gray-700 p-4 md:w-1/3 md:p-24">
        <div>Quickly Code Challenge</div>
      </div>
      <div className="flex items-center justify-center p-20 md:w-2/3 md:p-0">
        <div>
          <h1 className="text-4xl font-bold">Get started</h1>
          <div>
            <NavButton href="/signup" label={'Create an Account'} />
            <div>or</div>
            <NavButton href="/login" label={'Sign in'} />
          </div>
        </div>
      </div>
    </main>
  );
}
