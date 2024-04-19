'use client';

import { StyledInput } from '@/app/ui/styled-input';
import { useFormState } from 'react-dom';
import { login } from '@/lib/login-actions';

export function LoginForm() {
  const initialState = { message: null, errors: {} };
  // The server actions are still kinda weird since this is a fairly new react feature. I remember reading there's supposed to be a fix for this in react-dom eventually but I can't find the issue.
  // Or I might just be misremembering.
  // @ts-ignore
  const [state, dispatch] = useFormState(login, initialState);
  console.log(state);
  return (
    <form action={dispatch} className="flex flex-col gap-4">
      <StyledInput label={'Email Address'} fieldName={'email'} type={'email'} />
      <StyledInput
        label={'Password'}
        fieldName={'password'}
        type={'password'}
      />
      <button type="submit" className="rounded bg-blue-500 p-2 text-white">
        Login
      </button>
    </form>
  );
}
