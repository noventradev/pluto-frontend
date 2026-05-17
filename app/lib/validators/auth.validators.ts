import { RegisterRequest, LoginRequest } from '../types/auth.types';

export interface AuthFieldErrors {
  name?: string;
  email?: string;
  password?: string;
}

export function validateRegisterForm(form: RegisterRequest): AuthFieldErrors | null {
  const errors: AuthFieldErrors = {};

  if (!form.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Invalid email address';
  }

  if (!form.password) {
    errors.password = 'Password is required';
  } else if (form.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/[A-Z]/.test(form.password)) {
    errors.password = 'Password must contain an uppercase letter';
  } else if (!/[a-z]/.test(form.password)) {
    errors.password = 'Password must contain a lowercase letter';
  } else if (!/[0-9]/.test(form.password)) {
    errors.password = 'Password must contain a number';
  }

  return Object.keys(errors).length > 0 ? errors : null;
}

export function validateLoginForm(form: LoginRequest): AuthFieldErrors | null {
  const errors: AuthFieldErrors = {};

  if (!form.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Invalid email address';
  }

  if (!form.password) {
    errors.password = 'Password is required';
  }

  return Object.keys(errors).length > 0 ? errors : null;
}
