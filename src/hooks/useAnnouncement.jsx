import { useState, useCallback } from 'react';

/**
 * useAnnouncement Hook
 * 
 * Provides a way to announce messages to screen readers using ARIA live regions.
 * Returns an announce function and an AnnouncementRegion component to render.
 * 
 * @returns {Object} { announce, AnnouncementRegion }
 */
export function useAnnouncement() {
    const [message, setMessage] = useState('');
    const [politeness, setPoliteness] = useState('polite');

    const announce = useCallback((msg, level = 'polite') => {
        // Clear first to force re-announcement
        setMessage('');
        setPoliteness(level);

        // Use setTimeout to ensure the clear happens first
        setTimeout(() => {
            setMessage(msg);
        }, 100);
    }, []);

    const AnnouncementRegion = () => (
        <div
            role="status"
            aria-live={politeness}
            aria-atomic="true"
            className="sr-only"
        >
            {message}
        </div>
    );

    return {
        announce,
        AnnouncementRegion
    };
}
