import React, { ChangeEvent, FocusEvent, useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

interface ImageUploadProps {
  label: string;
  name: string;
  value: string | number | readonly string[] | undefined
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  error: string;
  required?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  onBlur,
  required = false,
}) => {

    
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 pl-1">*</span>}
      </label>
     
        <input
          type="file"
          accept="image/*"
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          className={`mt-1 p-2 ${
            error ? 'border-red-500' : ''
          }`}
        />
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
};

export default React.memo(ImageUpload);
