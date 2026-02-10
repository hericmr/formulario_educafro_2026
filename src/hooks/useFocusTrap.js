import { useEffect } from 'react';

/**
 * useFocusTrap Hook
 * 
 * Traps keyboard focus within a container (typically a modal/dialog).
 * Prevents tabbing outside the container and returns focus to the
 * triggering element when deactivated.
 * 
 * @param {boolean} isActive - Whether the trap is active
 * @param {RefObject} containerRef - Ref to the container element
 */
export function useFocusTrap(isActive, containerRef) {
    useEffect(() => {
        if (!isActive || !containerRef.current) return;

        const container = containerRef.current;
        const focusableElements = container.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
        );
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        // Store the element that had focus before the trap
        const previousFocus = document.activeElement;

        // Focus the first element when trap activates
        if (firstFocusable) {
            firstFocusable.focus();
        }

        const handleTab = (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                // Tab
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        };

        container.addEventListener('keydown', handleTab);

        return () => {
            container.removeEventListener('keydown', handleTab);
            // Return focus to the previous element
            if (previousFocus && previousFocus.focus) {
                previousFocus.focus();
            }
        };
    }, [isActive, containerRef]);
}
