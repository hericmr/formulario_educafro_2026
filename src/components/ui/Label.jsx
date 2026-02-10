import React from 'react';
import { cn } from '@/lib/utils';

const Label = React.forwardRef(({ className, children, required, htmlFor, ...props }, ref) => (
    <label
        ref={ref}
        htmlFor={htmlFor}
        className={cn(
            'text-base font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 mb-3 block',
            className
        )}
        {...props}
    >
        {children}
        {required && (
            <span className="text-primary-600 ml-1" aria-label="obrigatório">*</span>
        )}
    </label>
));
Label.displayName = 'Label';

export { Label };
