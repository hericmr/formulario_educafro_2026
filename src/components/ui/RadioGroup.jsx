import React from 'react';
import { cn } from '@/lib/utils';

/**
 * RadioOption - Individual radio button styled like Google Forms
 */
export const RadioOption = ({ id, value, label, name, checked, onChange, onBlur, error, disabled }) => (
    <label
        htmlFor={id}
        className={cn(
            'flex items-center p-3 border rounded-lg cursor-pointer transition-all hover:bg-app-surfaceHover',
            checked ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500' : 'border-app-border bg-white',
            error && 'border-red-300',
            disabled && 'opacity-50 cursor-not-allowed'
        )}
    >
        <input
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500 cursor-pointer disabled:cursor-not-allowed"
        />
        <span className={cn(
            'ml-3 text-sm font-medium select-none',
            checked ? 'text-primary-900' : 'text-gray-700'
        )}>
            {label}
        </span>
    </label>
);

/**
 * RadioGroup - Wrapper component for radio button groups
 * Compatible with react-hook-form
 */
export const RadioGroup = React.forwardRef(({
    options = [],
    value,
    onChange,
    onBlur,
    name,
    error,
    columns = 1,
    className,
    disabled = false,
    ...props
}, ref) => {
    // Grid classes based on columns
    const gridClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    };

    return (
        <div className={cn('space-y-2', className)} ref={ref} aria-invalid={!!error}>
            <div className={cn('grid gap-3', gridClasses[columns] || gridClasses[1])}>
                {options.map((option, idx) => {
                    const optionValue = typeof option === 'string' ? option : option.value;
                    const optionLabel = typeof option === 'string' ? option : option.label;
                    const optionDisabled = typeof option === 'object' ? option.disabled : false;

                    return (
                        <RadioOption
                            key={idx}
                            id={`${name}_${idx}`}
                            name={name}
                            value={optionValue}
                            label={optionLabel}
                            checked={value === optionValue}
                            onChange={() => onChange && onChange(optionValue)}
                            onBlur={onBlur}
                            error={error}
                            disabled={disabled || optionDisabled}
                        />
                    );
                })}
            </div>
            {error && (
                <span className="text-sm text-red-500 mt-1 block">{error}</span>
            )}
        </div>
    );
});

RadioGroup.displayName = 'RadioGroup';
