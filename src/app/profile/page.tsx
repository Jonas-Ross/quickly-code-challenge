import { AccountDetails } from '@/app/ui/account-details';
import { cookies } from 'next/headers';

async function fetchAccountInformation() {
  // Get account information with jwt in local storage
  const authToken = cookies().get('accessToken')?.value;
  const response = await fetch('https://api-dev.quicklyinc.com/auth/user', {
    method: 'GET',
    headers: { Authorization: `Bearer ${authToken}` },
  });
  return response.json();
}

export default async function Profile() {
  const details = await fetchAccountInformation();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-10">
      <div>
        <h1 className="text-4xl font-bold">Profile</h1>
        <AccountDetails user={details.user} />
      </div>
    </main>
  );
}
