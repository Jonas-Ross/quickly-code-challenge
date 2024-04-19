interface StyledInputProps {
  label: string;
  fieldName: string;
  type: string;
}

export function StyledInput({ label, fieldName, type }: StyledInputProps) {
  return (
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-white">
        {label}
      </label>
      <div className="relative mt-1 h-7 rounded-sm shadow-sm">
        <input
          type={type}
          name={fieldName}
          id={fieldName}
          className="block h-full rounded border-gray-300 py-1 pl-2 pr-2 text-sm text-black focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
}
