'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const SignupSchema = z
  .object({
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
      early_pay_intent: z.boolean(),
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
  })
  .superRefine(({ user, company }, ctx) => {
    if (user.email !== user.confirm_email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Emails do not match.',
      });
    }
    if (user.password !== user.confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match.',
      });
    }
  });

const UserSchema = z
  .object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email({ message: 'Invalid email address.' }),
    confirm_email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(6),
    confirm_password: z.string().min(6),
  })
  .superRefine(({ email, confirm_email, password, confirm_password }, ctx) => {
    if (email !== confirm_email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Emails do not match.',
      });
    }
    if (password !== confirm_password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match.',
      });
    }
  });

const CompanySchema = z.object({
  activity: z.object({
    early_pay_intent: z.boolean(),
    expected_activity: z.string(),
  }),
  early_pay_intent: z.boolean(),
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
});

export async function createUser(prevState: any, formData: FormData) {
  console.log('Creating user...');
  console.log(formData);
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
        early_pay_intent: formData.get('early_pay_intent'),
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
      has_trade_name: formData.get('has_trade_name'),
      legal_name: formData.get('legal_name'),
      expected_activity: formData.get('expected_activity'),
    },
  });

  console.log(validatedFields);

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log(validatedFields.error.issues);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Account.',
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
