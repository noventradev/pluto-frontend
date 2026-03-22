'use client';

import React from 'react';
import { cn } from '@/app/lib/utils';

interface FormInputFieldProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  inputClassName?: string;
  icon?: React.ReactNode;
  error?: string;
}

export function FormInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  className,
  inputClassName,
  icon,
  error,
}: FormInputFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {/* Label */}
      {label && (
        <label className="text-muted-foreground text-sm font-medium">
          {label}
        </label>
      )}

      {/* Input Wrapper */}
      <div
        className={cn(
          'flex items-center gap-2 rounded-xl border px-3 py-2',
          error ? 'border-red-500' : 'border-border',
          'focus-within:ring-primary/20 focus-within:ring-2'
        )}
      >
        {/* Icon */}
        {icon && <div className="text-muted-foreground">{icon}</div>}

        {/* Input */}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            'placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none',
            inputClassName
          )}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
