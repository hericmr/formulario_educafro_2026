import React from 'react';
import { cn } from '@/lib/utils';

const Input = React.forwardRef(({ className, type, error, ...props }, ref) => {
    return (
        <div className="relative">
            <input
                type={type}
                className={cn(
                    'flex h-11 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 hover:border-primary-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
                    error && 'border-red-500 focus-visible:ring-red-500',
                    className
                )}
                ref={ref}
                aria-invalid={!!error}
                {...props}
            />
            {error && (
                <span className="text-xs text-red-500 mt-1 absolute -bottom-5 left-1">{error}</span>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export { Input };
