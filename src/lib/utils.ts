export function checkConfirmFields(formData: FormData) {
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
}
