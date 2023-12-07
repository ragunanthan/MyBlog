// TextArea.tsx
import React, { ChangeEvent, FocusEvent, useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

interface TextAreaProps {
  label: string;
  name: string;
  type: string;
  value: string | null;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (e: FocusEvent<HTMLTextAreaElement>) => void;
  error: string;
  required?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  onBlur,
  required = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="mb-4 w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 pl-1">*</span>}
      </label>
      <div className="relative">
      <textarea
        name={name}
        value={value ?? ''}
        data-testid={name + '-' + 'TextArea'}
        onChange={onChange}
        onBlur={onBlur}
        className={`mt-1 p-2 w-full border rounded ${
          error ? 'border-red-500' : ''
        }`}
      />
       {type === 'password' && (
          <div
            onClick={togglePasswordVisibility}
            className="absolute top-3 right-2 p-1 cursor-pointer"
          >
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </div>
        )}
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
};

export default React.memo(TextArea);
