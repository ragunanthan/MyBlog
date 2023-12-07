import React, { ChangeEvent, FocusEvent } from 'react';

interface RadioInputProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}

const RadioInput: React.FC<RadioInputProps> = ({
  label,
  name,
  options,
  selectedValue,
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
    <div className="flex  gap-4 ">
      {options.map((option) => (
        <label key={option.value} className="inline-flex items-center">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={option.value === selectedValue}
            onChange={onChange}
            onBlur={onBlur}
            className={`form-radio border text-blue-500 focus:ring focus:ring-blue-200 ${
              error ? 'border-red-500 text-red-500' : ''
            }`}
          />
          {option.label}
        </label>
      ))}
    </div>
    {error && <div className="text-red-600 text-sm">{error}</div>}
  </div>
);

export default RadioInput;
