interface Company {
  id: number;
  name: string;
  legal_name: string;
  business_registration: string;
  business_type: string;
  industry: string;
  expected_activity: string;
  early_pay_intent: boolean | null;
  website: string;
  business_number: string;
  primary_email: string;
  phone: string;
}

interface User {
  full_name: string;
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  cognito_id: string;
  company_id: number;
  phone: string | null;
  avatar_url: string | null;
  createdAt: string;
  updatedAt: string;
  deleted_at: string | null;
  CompanyId: number;
  Company: Company;
  intercom_hash: string;
  roles: string;
  verified: boolean;
}

interface ApiResponse {
  user: User;
}

// Rendering account details. I would love to make it look nicer, but I have to move on.
// TODO: Clean up UI. Maybe add some skeleton loaders.
export function AccountDetails(details: ApiResponse) {
  const {
    user: { Company, ...userFields },
  } = details;
  return (
    <div className="flex">
      <div className="mr-8">
        <h2 className="text-2xl font-bold">User Information</h2>
        {Object.entries(userFields).map(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            return null;
          }
          return (
            <p key={key}>
              {key}: {value || 'N/A'}
            </p>
          );
        })}
      </div>
      <div>
        <h2 className="text-2xl font-bold">Company Information</h2>
        {Object.entries(Company).map(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            return null;
          }
          return (
            <p key={key}>
              {key}: {value || 'N/A'}
            </p>
          );
        })}
      </div>
    </div>
  );
}
