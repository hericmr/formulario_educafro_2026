import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Checkbox = forwardRef(({
    className,
    label,
    error,
    checked,
    required,
    id,
    'aria-describedby': ariaDescribedBy,
    ...props
}, ref) => {
    // Generate unique error ID if error exists
    const errorId = error && id ? `${id}-error` : undefined;

    // Combine aria-describedby with error ID
    const describedBy = [ariaDescribedBy, errorId].filter(Boolean).join(' ') || undefined;

    return (
        <div>
            <label
                className={cn(
                    "flex items-center p-3 border rounded-lg cursor-pointer transition-all hover:bg-app-surfaceHover",
                    checked ? "border-primary-500 bg-primary-50 ring-1 ring-primary-500" : "border-app-border bg-white",
                    error && "border-red-300",
                    className
                )}
            >
                <input
                    type="checkbox"
                    id={id}
                    ref={ref}
                    checked={checked}
                    className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                    aria-invalid={!!error}
                    aria-required={required}
                    aria-describedby={describedBy}
                    {...props}
                />
                {label && (
                    <span className={cn(
                        "ml-3 text-sm font-medium select-none",
                        checked ? "text-primary-900" : "text-gray-700"
                    )}>
                        {label}
                    </span>
                )}
            </label>
            {error && (
                <span
                    id={errorId}
                    className="text-xs text-red-500 mt-1 block"
                    role="alert"
                >
                    {error}
                </span>
            )}
        </div>
    );
});

Checkbox.displayName = 'Checkbox';
