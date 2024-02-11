"use client";
import React, { ChangeEvent, useEffect, useState } from 'react';
import * as yup from 'yup';
import Input from '../../components/formComponents/TextInput';
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Define a Yup validation schema
const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  confirmPassword:  yup.string()
  .oneOf([yup.ref('password'), ''], 'Passwords must match')
});

const initalValue = { username: '', password: '', confirmPassword : '', invalidUser: '' };

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '', confirmPassword : '' });
  const [errors, setErrors] = useState(initalValue);
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors(initalValue);
  };

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/");
    }
  }, [sessionStatus, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    validationSchema
      .validate(formData, { abortEarly: false })
      .then(async () => {
        try {
          setErrors(initalValue);
          const res = await fetch("/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email : formData.username,
              password : formData.password,
            }),
          });
          if (res.status === 400) {
            setErrors({ ...initalValue, invalidUser: "This email is already registered"});
          }
          if (res.status === 200) {
            router.push("/login");
          }
        } catch (err) {
          if (err instanceof Error) {
            setErrors({ ...initalValue, invalidUser: err.message });
          }
        }
      })
      .catch((validationErrors) => {
        if (validationErrors instanceof yup.ValidationError) {
          const newErrors: Record<string, string> = {};
          validationErrors.inner.forEach((error: yup.ValidationError) => {
            newErrors[error.path ?? ''] = error.message;
          });
          setErrors({ ...initalValue, ...newErrors });
        }
      });
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    validationSchema
      .validateAt(name, formData)
      .then(() => {
        setErrors({ ...errors, [name]: '', invalidUser: '' });
      })
      .catch((validationErrors) => {
        setErrors({
          ...errors,
          [name]: validationErrors.message,
          invalidUser: '',
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2
          className="text-2xl font-semibold mb-4 text-center text-gray-800"
          data-testid="login-title"
        >
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
          />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmPassword}
          />
          {errors.invalidUser && (
            <div className="text-red-600 text-sm" data-testid="error-message">
              {errors.invalidUser}
            </div>
          )}
          <button
            type="submit"
            className="w-full p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
            data-testid="login-button"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
