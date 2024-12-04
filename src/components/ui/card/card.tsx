import React from 'react';

export function Card({ children, className = '', ...props }) {
    return (
        <div
            className={`rounded-xl border border-gray-700 bg-opacity-20 bg-white backdrop-blur-md ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardHeader({ children, className = '', ...props }) {
    return (
        <div className={`p-6 ${className}`} {...props}>
            {children}
        </div>
    );
}

export function CardTitle({ children, className = '', ...props }) {
    return (
        <h3 className={`text-2xl font-semibold ${className}`} {...props}>
            {children}
        </h3>
    );
}

export function CardContent({ children, className = '', ...props }) {
    return (
        <div className={`p-6 pt-0 ${className}`} {...props}>
            {children}
        </div>
    );
}
