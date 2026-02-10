import React from 'react';

/**
 * SkipLink Component
 * 
 * Provides keyboard users a way to skip directly to main content areas.
 * The link is visually hidden until focused via Tab key.
 * 
 * @param {string} href - Target element ID (e.g., "#main-content")
 * @param {ReactNode} children - Link text
 */
export const SkipLink = ({ href, children }) => {
    return (
        <a
            href={href}
            className="skip-link"
        >
            {children}
        </a>
    );
};
