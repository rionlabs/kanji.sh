import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="prose sm:prose-md max-w-none prose-headings:font-normal">{children}</div>
    );
}
