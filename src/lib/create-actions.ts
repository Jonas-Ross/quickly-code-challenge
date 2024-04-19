'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const SignupSchema = z.object({
  user: z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email({ message: 'Invalid email address.' }),
    confirm_email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(6),
    confirm_password: z.string().min(6),
  }),
  company: z.object({
    activity: z.object({
      early_pay_intent: z.boolean(),
      expected_activity: z.string(),
    }),
    industry: z.object({
      value: z.string(),
      label: z.string(),
    }),
    business_type: z.object({
      value: z.string(),
      label: z.string(),
    }),
    website: z.string().optional(),
    business_registration: z.string(),
    phone: z.string(),
    business_number: z.string(),
    has_trade_name: z.boolean(),
    legal_name: z.string(),
    expected_activity: z.string(),
  }),
});

export async function createUser(prevState: any, formData: FormData) {
  // For some reason checkboxes are not being serialized as 'on' when checked, so we need to check for that. Don't know why. Might research later.
  const validatedFields = SignupSchema.safeParse({
    user: {
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      email: formData.get('email'),
      confirm_email: formData.get('confirm_email'),
      password: formData.get('password'),
      confirm_password: formData.get('confirm_password'),
    },
    company: {
      activity: {
        early_pay_intent: formData.get('early_pay_intent') === 'on',
        expected_activity: formData.get('expected_activity'),
      },
      early_pay_intent: formData.get('early_pay_intent'),
      industry: {
        value: formData.get('industry_value'),
        label: formData.get('industry_label'),
      },
      business_type: {
        value: formData.get('business_type_value'),
        label: formData.get('business_type_label'),
      },
      website: formData.get('website'),
      business_registration: formData.get('business_registration'),
      phone: formData.get('phone'),
      business_number: formData.get('business_number'),
      has_trade_name: formData.get('has_trade_name') === 'on',
      legal_name: formData.get('legal_name'),
      expected_activity: formData.get('expected_activity'),
    },
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Account.',
    };
  }

  // Should be a way to do these 2 with zod but refinements are not working for me right now and I don't want to spend more time on dealing with it.
  const emailsMatch = formData.get('email') === formData.get('confirm_email');
  const passwordsMatch =
    formData.get('password') === formData.get('confirm_password');
  if (!emailsMatch || !passwordsMatch) {
    return {
      errors: {
        user: {
          ...(!emailsMatch && { email: ['Email addresses do not match.'] }),
          ...(!emailsMatch && {
            confirm_email: ['Email addresses do not match.'],
          }),
          ...(!passwordsMatch && { password: ['Passwords do not match.'] }),
          ...(!passwordsMatch && {
            confirm_password: ['Passwords do not match.'],
          }),
        },
      },
      message: 'Failed to Create Account.',
    };
  }

  try {
    console.log('Creating user...');
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Account.',
    };
  }

  revalidatePath('/profile');
  redirect('/profile');
}
