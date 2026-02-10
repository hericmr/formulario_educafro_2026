import React from 'react';

/**
 * VisuallyHidden Component
 * 
 * Hides content visually while keeping it accessible to screen readers.
 * Useful for additional context, labels, or instructions that benefit
 * assistive technology users but would clutter the visual interface.
 * 
 * @param {ReactNode} children - Content to hide visually
 * @param {string} as - HTML element to render (default: 'span')
 */
export const VisuallyHidden = ({ children, as: Component = 'span', ...props }) => {
    return (
        <Component className="sr-only" {...props}>
            {children}
        </Component>
    );
};
