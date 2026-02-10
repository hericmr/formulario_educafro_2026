import React from 'react';
import { RefreshCw, CheckCircle2 } from 'lucide-react';

export const AutosaveIndicator = ({ isSaving, lastSaved }) => {
    if (isSaving) {
        return (
            <div className="flex items-center gap-2 text-primary-600 animate-pulse">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span className="text-xs font-medium">Salvando...</span>
            </div>
        );
    }

    if (lastSaved) {
        return (
            <div className="flex items-center gap-2 text-gray-400">
                <CheckCircle2 className="w-3 h-3" />
                <span className="text-xs">Salvo às {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
        );
    }

    return null;
};
