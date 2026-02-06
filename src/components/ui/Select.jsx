import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const Select = React.forwardRef(({ className, children, error, ...props }, ref) => {
    return (
        <div className="relative">
            <select
                className={cn(
                    'flex h-11 w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-400 hover:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all',
                    error && 'border-red-500 focus:ring-red-500',
                    className
                )}
                ref={ref}
                {...props}
            >
                {children}
            </select>
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
            {error && (
                <span className="text-xs text-red-500 mt-1 absolute -bottom-5 left-1">{error}</span>
            )}
        </div>
    );
});

Select.displayName = 'Select';

export { Select };
