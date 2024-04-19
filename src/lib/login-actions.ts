'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { storeToken } from '@/lib/session';

const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid email or password.',
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const response = await fetch('https://api-dev.quicklyinc.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { token } = await response.json();
      await storeToken(token);
    } else {
      const { message } = await response.json();
      return { message };
    }
  } catch (error) {
    console.error('Failed to login:', error);
    return { message: 'Failed to login.' };
  }
  revalidatePath('/profile');
  redirect('/profile');
}
