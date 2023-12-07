import React, { ChangeEvent, FocusEvent } from 'react';

interface CheckboxProps {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  children : string;
  value: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  onChange,
  onBlur,
  error,
  required = false,
  children,
  value
}) => (
  <div className="mb-4">
    <div className="flex gap-4">
    
        <label >
          <input
            type="Checkbox"
            name={name}
            checked={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`mr-1 form-Checkbox  border ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-300'
                : ''
            }`}
          />
          {children}
        </label>
    </div>
    {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
  </div>
);

export default Checkbox;
