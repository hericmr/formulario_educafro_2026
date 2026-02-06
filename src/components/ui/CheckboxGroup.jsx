import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from './Checkbox';

/**
 * CheckboxGroup - Wrapper component for checkbox groups
 * Compatible with react-hook-form for multi-select fields
 */
export const CheckboxGroup = React.forwardRef(({
    options = [],
    value = [],
    onChange,
    onBlur,
    name,
    error,
    columns = 1,
    className,
    disabled = false,
    ...props
}, ref) => {
    const handleChange = (optionValue) => (e) => {
        if (!onChange) return;

        const newValue = e.target.checked
            ? [...(value || []), optionValue]
            : (value || []).filter(v => v !== optionValue);

        onChange(newValue);
    };

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
                    const isChecked = Array.isArray(value) && value.includes(optionValue);

                    return (
                        <Checkbox
                            key={idx}
                            id={`${name}_${idx}`}
                            name={`${name}[]`}
                            value={optionValue}
                            label={optionLabel}
                            checked={isChecked}
                            onChange={handleChange(optionValue)}
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

CheckboxGroup.displayName = 'CheckboxGroup';
