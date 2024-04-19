import SignupForm from '@/app/ui/signup-form';

export default function Signup() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-10">
      <div>
        <div className="mt-12 rounded-md border border-white p-20">
          <h1 className="text-4xl font-bold">Signup</h1>
          <SignupForm />
        </div>
      </div>
    </main>
  );
}
