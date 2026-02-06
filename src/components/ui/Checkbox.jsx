import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export const Checkbox = forwardRef(({ className, label, error, checked, ...props }, ref) => {
    return (
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
                ref={ref}
                checked={checked}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
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
    );
});

Checkbox.displayName = 'Checkbox';
