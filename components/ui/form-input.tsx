import { cn } from '@/app/lib/utils';
import React from 'react';

interface FormInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type?: string;
  className?: string;
  max?: string;
  disabled?: boolean;
}

export function FormInput({
  value,
  label,
  onChange,
  type = 'text',
  className,
  ...props
}: FormInputProps) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        className={cn(
          'peer border-border bg-background w-full rounded-xl border px-3 pt-5 pb-2 text-sm transition-all outline-none',
          'focus:border-primary focus:ring-primary/20 focus:ring-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />

      {/* FLOATING LABEL */}
      <label
        className={cn(
          'text-muted-foreground absolute top-2 left-3 z-10 origin-left -translate-y-1 scale-75 transform text-xs transition-all',
          'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100',
          'peer-focus:text-primary peer-focus:top-2 peer-focus:-translate-y-1 peer-focus:scale-75'
        )}
      >
        {label}
      </label>
    </div>
  );
}
