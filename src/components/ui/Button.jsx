import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const Button = React.forwardRef(({ className, variant = 'default', size = 'default', children, isLoading, disabled, ...props }, ref) => {
    const variants = {
        default: 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/20',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700',
        ghost: 'hover:bg-gray-100 text-gray-700',
        secondary: 'bg-white text-primary-600 hover:bg-gray-50 border border-primary-200 shadow-sm',
        destructive: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20',
    };

    const sizes = {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-12 px-8 text-lg',
        icon: 'h-10 w-10',
    };

    return (
        <button
            ref={ref}
            disabled={disabled || isLoading}
            className={cn(
                'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
});

Button.displayName = 'Button';

export { Button };
