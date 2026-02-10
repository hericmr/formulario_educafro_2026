import React, { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * ErrorSummary Component
 * 
 * Displays a summary of form validation errors at the top of the form.
 * Automatically focuses when errors appear and provides clickable links
 * to jump to each field with an error.
 * 
 * @param {Array} errors - Array of error objects with {field, message}
 */
export const ErrorSummary = ({ errors = [] }) => {
    const summaryRef = useRef(null);

    useEffect(() => {
        if (errors.length > 0 && summaryRef.current) {
            summaryRef.current.focus();
        }
    }, [errors]);

    const handleErrorClick = (e, fieldId) => {
        e.preventDefault();
        const element = document.getElementById(fieldId);
        if (element) {
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    if (errors.length === 0) return null;

    return (
        <div
            ref={summaryRef}
            tabIndex={-1}
            role="alert"
            aria-labelledby="error-summary-title"
            className="error-summary"
        >
            <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" aria-hidden="true" />
                <div className="flex-1">
                    <h2 id="error-summary-title" className="text-lg font-bold text-red-900 mb-3">
                        {errors.length === 1
                            ? '1 erro encontrado no formulário'
                            : `${errors.length} erros encontrados no formulário`}
                    </h2>
                    <ul className="space-y-2">
                        {errors.map((error, index) => (
                            <li key={error.field || index}>
                                <a
                                    href={`#${error.field}`}
                                    onClick={(e) => handleErrorClick(e, error.field)}
                                    className="text-red-700 hover:text-red-900 underline font-medium"
                                >
                                    {error.message}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
