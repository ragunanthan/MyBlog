import React, { ChangeEvent, FocusEvent } from 'react';

interface CheckboxGroupProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  selectedValues: string[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  label,
  name,
  options,
  selectedValues,
  onChange,
  onBlur,
  error,
  required = false,
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 pl-1">*</span>}
    </label>
    <div className="flex gap-4">
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="Checkbox"
            name={name}
            value={option.value}
            checked={selectedValues.includes(option.value)}
            onChange={onChange}
            onBlur={onBlur}
            className={`mr-1 form-CheckboxGroup  border ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-300'
                : ''
            }`}
          />
          {option.label}
        </label>
      ))}
    </div>
    {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
  </div>
);

export default CheckboxGroup;
