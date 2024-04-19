'use client';

import { useFormState } from 'react-dom';
import { createUser } from '@/lib/actions';
import { StyledInput } from '@/app/ui/styled-input';

export default function SignupForm() {
  const initialState = { message: null, errors: {} };
  // The server actions are still kinda weird since this is a fairly new react feature. I remember reading there's supposed to be a fix for this in react-dom eventually but I can't find the issue.
  // Or I might just be misremembering.
  // @ts-ignore
  const [state, dispatch] = useFormState(createUser, initialState);

  console.log(state);
  return (
    <form action={dispatch} className="flex pt-8">
      <div className="mr-8">
        {/* User Information Fields */}
        <h2>User Information</h2>
        <StyledInput
          label={'First Name'}
          fieldName={'first_name'}
          type={'text'}
        />
        <StyledInput
          label={'Last Name'}
          fieldName={'last_name'}
          type={'text'}
        />
        <StyledInput label={'Email'} type={'email'} fieldName={'email'} />
        <StyledInput
          label={'Confirm Email'}
          type={'email'}
          fieldName={'confirm_email'}
        />
        <StyledInput
          label={'Password'}
          type={'password'}
          fieldName={'password'}
        />
        <StyledInput
          label={'Confirm Password'}
          type={'password'}
          fieldName={'confirm_password'}
        />
      </div>
      <div className="mr-8">
        {/* Company Information Fields */}
        <h2>Company Information</h2>
        <StyledInput
          label={'Early Payment Intent'}
          type={'checkbox'}
          fieldName={'early_pay_intent'}
        />
        <StyledInput
          label={'Expected Activity'}
          type={'text'}
          fieldName={'expected_activity'}
        />
        <StyledInput
          label={'Industry Value'}
          type={'text'}
          fieldName={'industry_value'}
        />
        <StyledInput
          label={'Industry Label'}
          type={'text'}
          fieldName={'industry_label'}
        />
        <StyledInput
          label={'Business Type Value'}
          type={'text'}
          fieldName={'business_type_value'}
        />
        <StyledInput
          label={'Business Type Label'}
          type={'text'}
          fieldName={'business_type_label'}
        />
      </div>
      <div className="pt-6">
        <StyledInput label={'Website'} type={'url'} fieldName={'website'} />
        <StyledInput
          label={'Business Registration'}
          type={'text'}
          fieldName={'business_registration'}
        />
        <StyledInput label={'Phone'} type={'tel'} fieldName={'phone'} />
        <StyledInput
          label={'Business Number'}
          type={'text'}
          fieldName={'business_number'}
        />
        <StyledInput
          label={'Has Trade Name'}
          type={'checkbox'}
          fieldName={'has_trade_name'}
        />
        <StyledInput
          label={'Legal Name'}
          type={'text'}
          fieldName={'legal_name'}
        />
        <StyledInput
          label={'Expected Activity (Company)'}
          type={'text'}
          fieldName={'company_expected_activity'}
        />
        <button className="mt-10" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
