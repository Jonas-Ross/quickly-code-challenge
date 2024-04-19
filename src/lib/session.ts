import 'server-only';
import { cookies } from 'next/headers';

// Opting to use cookies instead of local storage for security reasons, however I am disabling the httpOnly flag for now to make it testable in a development environment.
// Would probably want this to be a flag that is set based on the environment.
export async function storeToken(token: string) {
  cookies().set({
    name: 'accessToken',
    value: token,
    httpOnly: false,
    sameSite: 'strict',
    secure: true,
  });
}
