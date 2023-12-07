import React, { ChangeEvent, FocusEvent } from 'react';

interface SelectInputProps {
  label: string;
  name: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: FocusEvent<HTMLSelectElement>) => void;
  error?: string;
  placeholder: string;
  required?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  onBlur,
  error,
  placeholder,
  required = false,
}) => (
  <div className="mb-4 w-full">
    <label className="block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 pl-1">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`mt-1 p-2 block w-full   border rounded rounded-md  ${
        error
          ? ' border  border-red-500 focus:border-red-500 focus:ring-red-300'
          : ''
      }`}
    >
      {placeholder && <option value={0}>{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
  </div>
);

export default SelectInput;
