import React from 'react';
import { cn } from '@/lib/utils';

export const ProgressBar = ({ progress, className }) => {
    return (
        <div className={cn("w-full bg-gray-200 h-1.5", className)}>
            <div
                className="bg-primary-600 h-1.5 transition-all duration-500 ease-out"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            ></div>
        </div>
    );
};
