'use client';

import React from 'react';
import { cn } from '@/app/lib/utils';

interface Option {
  label: string;
  value: string;
}

interface FormSelectFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  error?: string;
}

export function FormSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
  icon,
  className,
  error,
}: FormSelectFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <label className="text-muted-foreground text-sm font-medium">
          {label}
        </label>
      )}

      <div className="border-border bg-background focus-within:ring-primary/20 flex items-center gap-2 rounded-xl border px-3 py-2 focus-within:ring-2">
        {icon && <div className="text-muted-foreground">{icon}</div>}

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-sm outline-none"
        >
          <option value="" hidden>
            {placeholder || 'Select'}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
