import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from './Checkbox';

/**
 * CheckboxGroup - Wrapper component for checkbox groups
 * Compatible with react-hook-form for multi-select fields
 */
export const CheckboxGroup = React.forwardRef((({
    options = [],
    value = [],
    onChange,
    onBlur,
    name,
    error,
    columns = 1,
    className,
    disabled = false,
    label,
    description,
    required,
    ...props
}, ref) => {
    const groupId = `${name}-group`;
    const labelId = label ? `${name}-label` : undefined;
    const descId = description ? `${name}-desc` : undefined;
    const errorId = error ? `${name}-error` : undefined;

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

    // Build aria-describedby
    const describedBy = [descId, errorId].filter(Boolean).join(' ') || undefined;

    return (
        <div className={cn('space-y-2', className)} ref={ref}>
            <div
                id={groupId}
                role="group"
                aria-labelledby={labelId}
                aria-describedby={describedBy}
                aria-invalid={!!error}
                aria-required={required}
            >
                {label && (
                    <div id={labelId} className="text-base font-semibold text-gray-700 mb-3">
                        {label}
                        {required && <span className="text-primary-600 ml-1" aria-label="obrigatório">*</span>}
                    </div>
                )}
                {description && (
                    <div id={descId} className="text-sm text-gray-600 mb-3">
                        {description}
                    </div>
                )}
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
                                disabled={disabled || optionDisabled}
                            />
                        );
                    })}
                </div>
            </div>
            {error && (
                <span
                    id={errorId}
                    className="text-sm text-red-500 mt-1 block"
                    role="alert"
                >
                    {error}
                </span>
            )}
        </div>
    );
}));

CheckboxGroup.displayName = 'CheckboxGroup';
