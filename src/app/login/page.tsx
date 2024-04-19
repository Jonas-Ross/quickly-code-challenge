import { LoginForm } from '@/app/ui/login-form';

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <div>
        <h1 className="text-4xl font-bold">Login</h1>
        <div className="mt-12 rounded-md border border-white p-20">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
